import { Vet } from '../models/vet.js'
import { Pet } from '../models/pet.js'

const createVet = async (req, res) => {
  try {
    req.body.pet = req.user.pet
    console.log('this is the req.user.pet', req.user.pet)
    const vet = await Vet.create(req.body)
    const pet = await Pet.findByIdAndUpdate(
      req.user.pet,
      { $push: {vets: vet}},
      { new: true }
    )
    vet.pet = pet
    res.status(201).json(vet)
  } catch (error) {
    console.log(error)
    res.status(500).json(error)
  }
}

const indexVet = async (req, res) => {
  try {
    const vets = await Vet.find({})
      .populate('pet')
    res.status(200).json(vets)
  } catch (error) {
    res.status(500).json(error)
  }
}


export {
  createVet,
  indexVet,
}