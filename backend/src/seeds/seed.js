// backend/src/seeds/seed.js
// Script para poblar MongoDB desde data/books.csv

import fs from 'fs'
import path from 'path'
import csv from 'csv-parser'
import dotenv from 'dotenv'
import mongoose from 'mongoose'

// Importa tu configuración y modelos
import connectDB from '../config/db.js'
import Author from '../models/Author.js'
import Book from '../models/Book.js'
import User from '../models/User.js'

dotenv.config()

async function seed() {
  try {
    // 1. Conectar a la base de datos
    await connectDB()
    console.log('✅ Conectado a MongoDB para seeding')

    const filePath = path.join(process.cwd(), 'data', 'books.csv')
    if (!fs.existsSync(filePath)) {
      throw new Error(`No se encontró el CSV en ${filePath}`)
    }

    // 2. Leer y parsear CSV
    const rows = []
    fs.createReadStream(filePath)
      .pipe(csv())
      .on('data', (row) => {
        rows.push(row)
      })
      .on('end', async () => {
        console.log(`✅ Leídos ${rows.length} registros de books.csv`)

        // 3. Borrar datos previos (opcional)
        await Author.deleteMany()
        await Book.deleteMany()
        console.log('🗑️  Colecciones Author y Book limpiadas')

        // 4. Insertar autores únicos y libros
        const authorsMap = new Map()

        for (const row of rows) {
          const {
            title,
            authorName,
            synopsis,
            category,
            price,
            stock,
            coverImageUrl
          } = row

          // Crear o buscar autor
          let authorId
          if (authorsMap.has(authorName)) {
            authorId = authorsMap.get(authorName)
          } else {
            const authorDoc = await Author.create({
              name: authorName,
              biography: 'Sin biografía disponible.',
              photo: ''
            })
            authorId = authorDoc._id
            authorsMap.set(authorName, authorId)
          }

          // Crear libro
          await Book.create({
            title,
            author: authorId,
            synopsis,
            category,
            price: parseFloat(price),
            stock: parseInt(stock, 10),
            coverImage: coverImageUrl
          })
        }
        console.log(
          `✅ Insertados ${rows.length} libros y ${authorsMap.size} autores`
        )

        // 5. Crear usuario admin si no existe
        const adminEmail = 'admin@kbook.com'
        const existing = await User.findOne({ email: adminEmail })
        if (!existing) {
          await User.create({
            name: 'Admin Seed',
            email: adminEmail,
            password: 'admin123',
            role: 'admin'
          })
          console.log('✅ Usuario admin creado (admin@kbook.com / admin123)')
        } else {
          console.log('ℹ️  Usuario admin ya existía, no se creó')
        }

        console.log('🎉 Seed completado con éxito')
        process.exit()
      })
  } catch (err) {
    console.error('❌ Error en seed:', err)
    process.exit(1)
  }
}

seed()
