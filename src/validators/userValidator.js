import { z } from 'zod'

const userSchemaZod = z.object({
  username: z.string({ message: 'El username debe ser un string' }).trim().min(1, { message: 'El username es obligatorio' }),
  password: z.string({ message: 'La contraseña debe ser un string' }).trim().min(6, { message: 'La contraseña debe tener un 6 caracteres como mínimo.' })
}).strict() // strict prevents zod from accepting non-declarated atributes

export { userSchemaZod }
