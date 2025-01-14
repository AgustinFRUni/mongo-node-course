// userController.js

// Importa los módulos necesarios
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { userSchemaZod } from '../validators/userValidator.js'
import { User } from '../models/userModel.js'

// Destructura la palabra secreta del JWT del proceso de entorno
const { JWT_SECRET_WORD } = process.env

// Define las funciones del controlador
/*
export const save = async (req, res, next) => {
  const { username, password } = req.body

  const data = await userModel.create({ username: username, password: password })
  res.json({ status: 'success', message: 'User added successfully!', data: data })
}
*/

export const registerUser = async (req, res, next) => {
  try {
    const { username, password } = req.body

    const validatedData = userSchemaZod.parse({ username, password })
    // password hashed hashed by model pre-save

    const newUser = new User({ username: validatedData.username, password })

    await newUser.save()

    res.status(201).json({ message: 'Usuario registrado con éxito', userId: newUser._id })
  } catch (error) {
    if (error.name === 'ZodError') {
      return res.status(400).json({ message: 'Datos de entrada inválidos', errors: error.errors })
    } else if (error.name === 'MongoServerError' && error.code === 11000) {
      return res.status(400).json({ message: 'Usuario ya existente. Elige otro username por favor.' })
    }
    res.status(500).json({ error: 'Error interno del servidor' })
  }
}

export const loginUser = async (req, res) => {
  try {
    const { username, password } = req.body

    if (!username || !password) {
      return res.status(400).json({ message: 'Datos faltantes, email o contraseña' })
    }

    const validatedData = userSchemaZod.partial().parse({ username, password })

    const user = await User.findOne({ username: validatedData.username })

    if (user) {
      if (await bcrypt.compare(validatedData.password, user.password)) {
        const token = jwt.sign({ id: user._id, username: user.username }, JWT_SECRET_WORD, { expiresIn: '1h' })
        res.json({ status: 'success', message: 'Usuario encontrado!', data: { user: { _id: user._id, username: user.username } }, token })
      } else {
        res.json({ status: 'error', message: 'Usuario o contraseña incorrectos!', data: null })
      }
    } else {
      res.status(404).json({ status: 'not_found', message: 'Usuario no encontrado!', data: null })
    }
  } catch (error) {
    if (error.name === 'ZodError') {
      return res.status(400).json({ message: 'Datos de entrada inválidos', errors: error.errors })
    }

    res.status(500).json({ message: 'Error interno del servidor0', error })
  }
}
