import mongoose from 'mongoose'

const Schema = mongoose.Schema

const emergencyContactSchema = new Schema({
  name: String,
  phoneNumber: String,
  email: String,
})

const petSchema = new Schema({
  petName: String,
  species: String,
  color: String,
  breed: String,
  age: Number,
  weight: Number,
  behaviorNotes: String,
  allergies: String,
  microchipLink: String,
  emergencyContact: [emergencyContactSchema],
  vet: { type: Schema.Types.ObjectId, ref: 'Vet' },
  owner: { type: Schema.Types.ObjectId, ref: 'Profile' }
},{
  timestamps: true,
})

const Pet = mongoose.model('Pet', petSchema)

export { Pet }
