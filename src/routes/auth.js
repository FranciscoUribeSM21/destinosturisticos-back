const express = require("express");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");
const { generateToken } = require("../utils/jwt");
const sendEmail = require("../utils/sendEmail");
const { User } = require("../models");
const { Op } = require("sequelize");

const router = express.Router();

// Registro
router.post("/register", async (req, res) => {
  const { name, email, password, role } = req.body;

  try {
    // Verificar si el email ya existe
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: "El email ya está registrado" });
    }

    // Generar hash de la contraseña
    const passwordHash = await bcrypt.hash(password, 10);

    // Crear nuevo usuario
    const newUser = await User.create({
      uuid: crypto.randomUUID(),
      name,
      email,
      passwordHash,
      salt: null,
      role: role || "user",
      isActive: true,
      lastLogin: null,
    });

    res.status(201).json({
      message: "Usuario registrado correctamente",
      user: {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al registrar usuario", error });
  }
});

// Login
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(400).json({ message: "Usuario no encontrado" });
    }

    const validPassword = await bcrypt.compare(password, user.passwordHash);
    if (!validPassword) {
      return res.status(401).json({ message: "Contraseña incorrecta" });
    }

    user.lastLogin = new Date();
    await user.save();

    const token = generateToken(user);

    res.json({
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error en el login", error });
  }
});

// Forgot Password
router.post("/forgot-password", async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    const token = crypto.randomBytes(32).toString("hex");
    const expiration = new Date(Date.now() + 60 * 60 * 1000); // 1 hora

    user.resetPasswordToken = token;
    user.resetPasswordExpires = expiration;
    await user.save();

    const resetLink = `${process.env.FRONTEND_URL}/admin/recuperar-contrasena/${token}`;

    await sendEmail({
      to: email,
      subject: "Restablecer contraseña",
      html: `
        <h2>Solicitud de restablecimiento de contraseña</h2>
        <p>Haz clic en el siguiente enlace para restablecer tu contraseña:</p>
        <a href="${resetLink}" target="_blank">${resetLink}</a>
        <p>Este enlace expirará en 1 hora.</p>
      `,
    });

    return res.json({
      message: "Se ha enviado un enlace de recuperación a tu correo.",
    });
  } catch (error) {
    console.error("Error en forgot-password:", error);
    return res.status(500).json({ message: "Error interno del servidor" });
  }
});

// Reset Password
router.post("/reset-password", async (req, res) => {
  try {
    const { token, password } = req.body;

    const user = await User.findOne({
      where: {
        resetPasswordToken: token,
        resetPasswordExpires: { [Op.gt]: new Date() },
      },
    });

    if (!user) {
      return res.status(400).json({ message: "Token inválido o expirado" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    user.passwordHash = hashedPassword;
    user.resetPasswordToken = null;
    user.resetPasswordExpires = null;
    await user.save();

    return res.json({ message: "Contraseña restablecida correctamente." });
  } catch (error) {
    console.error("Error en reset-password:", error);
    return res.status(500).json({ message: "Error interno del servidor" });
  }
});

module.exports = router;
