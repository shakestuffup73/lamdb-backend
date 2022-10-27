import { Vet } from '../models/vet.js'
import { Pet } from '../models/pet.js'
import { Profile } from '../models/profile.js'

const createVet = async (req, res) => {
  try {
    const vet = await Vet.create(req.body)
    const pet = await Pet.findByIdAndUpdate(
      req.body.vet,
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
    const vets = await Vet.find({pet: req.params.id})
      .populate('pet')
      console.log('this is indexVet', vets);
    res.status(200).json(vets)
  } catch (error) {
    res.status(500).json(error)
  }
}

const showVet = async (req, res) => {
  try {
    const vet = await Vet.findById(req.params.id)
      .populate('pet.petName')
    res.status(200).json(vet)
  } catch (error) {
    res.status(500).json(error)
  }
}

const deleteVet = async (req,res) => {
  try {
    const vet = await Vet.findByIdAndDelete(req.params.id)
    const pet = await Pet.findById(req.user.pet)
    pet.vet.remove({_id: req.params.id })
    await pet.save()
    res.status(200).json(vet)
  } catch (error) {
    res.status(500).json(error)
  }
}

export {
  createVet,
  indexVet,
  showVet,
  deleteVet as delete,
}