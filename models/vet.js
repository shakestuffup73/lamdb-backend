import mongoose from 'mongoose'

const Schema = mongoose.Schema

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
  pet: { type: Schema.Types.ObjectId, ref: 'Pet' } 
},{
  timestamps: true,
})

const Vet = mongoose.model('Vet', vetSchema)

export { Vet }