import { mongoose } from 'mongoose'

const BookSchema = mongoose.Schema({
  title: {
    type: String,
    required: [true, 'El título es obligatorio'],
    unique: true,
    trim: true
  },
  isbn: {
    type: String,
    required: [true, 'El ISBN es obligatorio'],
    trim: true
  },
  category: {
    type: String,
    required: [true, 'La categoría es obligatoria'],
    trim: true
  },
  price: {
    type: Number,
    required: [true, 'El precio es obligatorio'],
    min: [0, 'El precio debe ser mayor o igual a 0']
  },
  pages: {
    type: Number,
    required: [true, 'El número de páginas es obligatorio'],
    min: [1, 'El número de páginas debe ser mayor o igual a 1']
  },
  authorName: {
    type: String,
    required: [true, 'El nombre del autor es obligatorio'],
    trim: true
  },
  yearOfRelease: {
    type: Number,
    required: [true, 'El año de lanzamiento es obligatorio'],
    min: [1000, 'El año de lanzamiento debe ser un número válido'],
    max: [new Date().getFullYear(), 'El año de lanzamiento no puede ser superior al año actual']
  },
  sinopsis: {
    type: String,
    default: 'Sin sinopsis'
  }
},
  {
    versionKey: false
  })

const Book = mongoose.model('Book', BookSchema)

export { Book }
