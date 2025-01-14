import { Book } from '../models/bookModel.js'
import { bookSchemaZod } from '../validators/bookValidator.js'

export const getAll = async (req, res, next) => {
  try {
    const documents = await Book.find()
    res.json(documents)
  } catch (e) {
    res.status(500).json({ message: 'Error al obtener los libros', error: e.message })
  }
}

export const getById = async (req, res, next) => {
  const { id } = req.params
  try {
    const book = await Book.findById(id)

    if (!book) {
      return res.status(404).json({ error: 'No se encuentra el libro' })
    }

    res.json(book)
  } catch (error) {
    if (error.name === 'CastError') {
      return res.status(500).json({ error: 'El formato del id es incorrecto' })
    }
    res.status(500).json({ message: 'Error interno del servidor', error: error.message })
  }
}

export const createBook = async (req, res) => {
  try {
    const validatedData = bookSchemaZod.parse(req.body)

    const newBook = new Book(validatedData)
    await newBook.save()

    res.status(201).json(newBook)
  } catch (error) {
    if (error.name === 'ZodError') {
      return res.status(400).json({ message: 'Datos de entrada inválidos', errors: error.errors })
    } else if (error.name === 'MongoServerError' && error.code === 11000) {
      return res.status(409).json({ message: 'El nombre del libro ya existe.' })
    } else {
      return res.status(500).json({ message: 'Error al crear el libro', error: error.message })
    }
  }
}

export const updateBook = async (req, res) => {
  const { id } = req.params
  try {
    const validatedData = bookSchemaZod.partial().parse(req.body)
    const updatedBook = await Book.findByIdAndUpdate(id, validatedData, { new: true })

    if (!updatedBook) {
      return res.status(404).json({ error: 'No se encuentra el libro' })
    }

    res.json(updatedBook)
  } catch (error) {
    if (error.name === 'ZodError') {
      return res.status(400).json({ message: 'Datos de entrada inválidos', errors: error.errors })
    } else if (error.name === 'CastError') {
      return res.status(500).json({ error: 'El formato del id es incorrecto' })
    } else {
      return res.status(500).json({ message: 'Error al modificar el libro', error: error.message })
    }
  }
}

export const deleteBook = async (req, res) => {
  const { id } = req.params
  try {
    const deletedBook = await Book.findByIdAndDelete(id)

    if (!deletedBook) {
      return res.status(404).json({ error: 'No se encuentra el libro' })
    }

    res.json({ message: `Libro ID: ${deletedBook._id} borrado con éxito` })
  } catch (error) {
    if (error.name === 'CastError') {
      return res.status(500).json({ error: 'El formato del id es incorrecto' })
    } else {
      return res.status(500).json({ message: 'Error al borrar el libro', error: error.message })
    }
  }
}

export const getBookStats = async (req, res) => {
  try {
    const stats = await Book.aggregate([
      {
        $group: {
          _id: '$category',
          averagePrice: { $avg: '$price' },
          averagePages: { $avg: '$pages' },
          bookCount: { $sum: 1 }
        }
      },
      {
        $project: {
          _id: 0,
          category: '$_id',
          averagePrice: { $round: ['$averagePrice', 2] },
          averagePages: { $round: ['$averagePages', 2] },
          bookCount: 1
        }
      }
    ])

    res.json(stats)
  } catch (error) {
    res.status(500).json({
      message: 'Error al calcular estadísticas',
      error: error.message
    })
  }
}
