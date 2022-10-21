import mongoose from 'mongoose'

const Schema = mongoose.Schema

const pdfSchema = newSchema ({
  date: String,
  details: String,
})

const vetSchema = new Schema({
  name: String,
  contact: String,
  description: String,
  diagnosis: String,
  results: String,
  medications: String,
  weight: Number,
  cost: Number,
  appointment: String,
  rabies: String,
  pdf: [pdf]
},{
  timestamps: true,
})

const Vet = mongoose.model('Vet', vetSchema)

export { Vet }