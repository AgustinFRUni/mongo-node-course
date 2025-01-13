import { z } from 'zod'

const bookSchemaZod = z.object({
  title: z.string().min(1, { message: 'El título es obligatorio' }).trim(),
  isbn: z.string().min(1, { message: 'El ISBN es obligatorio' }).trim(),
  category: z.string().min(1, { message: 'La categoría es obligatoria' }).trim(),
  price: z.number().min(0, { message: 'El precio debe ser mayor o igual a 0' }),
  pages: z.number().min(1, { message: 'El número de páginas debe ser mayor o igual a 1' }),
  authorName: z.string().min(1, { message: 'El nombre del autor es obligatorio' }).trim(),
  yearOfRelease: z.number().min(1000, { message: 'El año de lanzamiento debe ser un número válido' }).max(new Date().getFullYear(), { message: 'El año de lanzamiento no puede ser superior al año actual' }),
  sinopsis: z.string().optional().default('Sin sinopsis')
}).strict()
// strict prevents zod from accepting non-declarated atributes

export { bookSchemaZod }
