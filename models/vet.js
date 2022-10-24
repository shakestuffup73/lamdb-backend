import mongoose from 'mongoose'

const Schema = mongoose.Schema

const pdfSchema = new Schema ({
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
  weight: String,
  cost: String,
  appointment: String,
  rabies: String,
  pdf: [pdfSchema],
  pet: { type: Schema.Types.ObjectId, ref: 'Pet' } 
},{
  timestamps: true,
})

const Vet = mongoose.model('Vet', vetSchema)

export { Vet }