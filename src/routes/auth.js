const express = require("express");
const bcrypt = require("bcryptjs");
const { generateToken } = require("../utils/jwt");
const User = require("../models/user");

const router = express.Router();

// Simulación de base de datos en memoria (reemplaza por tu modelo Sequelize/MongoDB)
const users = [];

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
        id: crypto.randomUUID(),  // UUID único
        name,
        email,
        passwordHash,
        salt: null,               // bcrypt ya incluye el salt
        role: role || "user",
        isActive: true,
        lastLogin: null
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
  
      // Validar contraseña
      const validPassword = await bcrypt.compare(password, user.passwordHash);
      if (!validPassword) {
        return res.status(401).json({ message: "Contraseña incorrecta" });
      }
  
      // Actualizar último login
      user.lastLogin = new Date();
      await user.save();
  
      // Generar token
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

module.exports = router;
