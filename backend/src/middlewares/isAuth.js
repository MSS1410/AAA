// backend/src/middleware/auth.js
import jwt from 'jsonwebtoken'
import User from '../models/User.js'
import dotenv from 'dotenv'

dotenv.config()

export const isAuth = async (req, res, next) => {
  try {
    const header = req.headers.authorization
    if (!header || !header.startsWith('Bearer '))
      return res.status(401).json({ message: 'Token no proporcionado' })

    const token = header.split(' ')[1]
    const payload = jwt.verify(token, process.env.JWT_SECRET)
    const user = await User.findById(payload.id).select('-password')

    if (!user) return res.status(401).json({ message: 'Usuario no válido' })

    req.user = user // adjuntamos el usuario al request
    next()
  } catch (err) {
    return res.status(401).json({ message: 'Token inválido o expirado' })
  }
}
