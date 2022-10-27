import { Vet } from '../models/vet.js'
import { Pet } from '../models/pet.js'
import { Profile } from '../models/profile.js'

const createVet = async (req, res) => {
  try {
    const vet = await Vet.create(req.body)
    const pet = await Pet.findByIdAndUpdate(
      req.body.pet,
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
    const pet = await Profile.find({pets: req.user.profile})
    .populate('profile.pets')
    // find profile first (req.user.profile) then check on the profile for pet that is in profile.pets
    const vets = await Vet.find({pet: req._id.pet}) // pass in the :id of the pet we're looking for (req._id.pet)
      .populate('pet')
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

const updateVet = async (req, res) => {
  try {
    const vet = await Vet.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true}
    ) .populate('pet.petName')
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
  updateVet,
  deleteVet as delete,
}