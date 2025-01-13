import { Router } from 'express'
import { getAll, getById, getBookStats, createBook, deleteBook, updateBook } from '../controllers/bookController.js'
import jwt from 'jsonwebtoken'
const { JWT_SECRET_WORD } = process.env
export const router = Router()

router.get('/', getAll)

router.get('/stats', validateUser, getBookStats)

router.get('/:id', getById)

router.post('/', validateUser, createBook)

router.patch('/:id', validateUser, updateBook)

router.delete('/:id', validateUser, deleteBook)

function validateUser (req, res, next) {
  const token = req.headers?.authorization?.split(' ')[1]
  if (token) {
    jwt.verify(token, JWT_SECRET_WORD, (err, decoded) => {
      if (err) {
        return res.status(401).json({ succes: false, message: 'Token inválido o expirado' })
      }
      req.decoded = decoded
      next()
    })
  } else {
    res.status(401).json({ succes: false, message: 'Token no provisto' })
  }
}

export default router
