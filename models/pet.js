import mongoose from 'mongoose'

const Schema = mongoose.Schema

const emergencyContactSchema = new Schema({
  name: String,
  phoneNumber: String,
  email: String,
})

const petSchema = new Schema({
  petName: {
    type: String,
    required: true,
  },
  species: {
    type: String,
    required: true,
  },
  color: {
    type: String,
    required: true,
  },
  breed: String,
  age: Number,
  weight: Number,
  behaviorNotes: String,
  allergies: String,
  microchipLink: String,
  emergencyContact: [emergencyContact],
  vet: { type: Schema.Types.ObjectId, ref: 'Vet' }
},{
  timestamps: true,
})

const Pet = mongoose.model('Pet', petSchema)

export { Pet }
