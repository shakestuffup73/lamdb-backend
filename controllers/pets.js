import { Pet } from "../models/pet.js"
import { Profile } from "../models/profile.js"
import { v2 as cloudinary } from 'cloudinary'
// import { trueColor } from "@cloudinary/url-gen/qualifiers/colorSpace.js"

const create = async (req, res) => {
  try {
    req.body.owner = req.user.profile
    console.log('this is the req.user.profile', req.user.profile)
    const pet = await Pet.create(req.body)
    const profile = await Profile.findByIdAndUpdate(
      req.user.profile,
      { $push: {pets: pet}},
      { new: true }
    )
    pet.owner = profile
    // const updatedProfile = await Profile.findById(req.user.profile).populate('pets')

    res.status(201).json(pet)
  } catch (error) {
    console.log(error)
    res.status(500).json(error)
  }
}

function addPhoto(req, res) {
  const imageFile = req.files.photo.path
  Pet.findById(req.params.id)
  .then(pet => {
    cloudinary.uploader.upload(imageFile, {tags: `${req.user.email}`})
    // In an application with auth you'll use: {tags: `${req.user.email}`}
    .then(image => {
      pet.photo = image.url
      pet.save()
      .then(pet => {
        res.status(201).json(pet.photo)
      })
    })
    .catch(err => {
      console.log(err)
      res.status(500).json(err)
    })
  })
}

const index = async (req, res) => {
  try {
    const pets = await Pet.find({owner: req.user.profile})
      .populate('owner')
    res.status(200).json(pets)
  } catch (error) {
    res.status(500).json(error)
  }
}

const show = async (req, res) => {
  try {
    const pet = await Pet.findById(req.params.id)
      .populate('owner')
    res.status(200).json(pet)
  } catch (error) {
    res.status(500).json(err)
  }
}

const update = async (req, res) => {
  try {
    const pet = await Pet.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true}
    ) .populate('owner')
    res.status(200).json(pet)
  } catch (error) {
    res.status(500).json(error)
  }
}

const deletePet = async (req,res) => {
  try {
    const pet = await Pet.findByIdAndDelete(req.params.id)
    const profile = await Profile.findById(req.user.profile)
    profile.pets.remove({_id: req.params.id })
    await profile.save()
    res.status(200).json(pet)
  } catch (error) {
    res.status(500).json(error)
  }
}

// emergency contact
const createContact = async (req, res) => {
  try {
    console.log('CREATE CONTACT!!!!!!!!');
    console.log('this is req.params.id', req.params.id);
    req.body.owner = req.user.profile
    const pet = await Pet.findById(req.params.id)
    pet.emergencyContact.push(req.body)
    await pet.save()

    const newContact = pet.emergencyContact [pet.emergencyContact.length - 1]

    res.status(201).json(newContact)
  } catch (error) {
    console.log(error);
    res.status(500).json(error)
  }
}


const deleteContact = async (req, res) => {
  try {
    console.log(req.params)
    req.body.owner = req.user.profile
    const pet = await Pet.findById(req.params.petId)
    pet.emergencyContact.remove({_id:req.params.cId})
    await pet.save()
    res.status(200).json(pet.emergencyContact)
  } catch (error) {
    res.status(500).json(error)
  }
}



export {
  create,
  addPhoto,
  index,
  show,
  update,
  deletePet as delete,
  createContact,
  deleteContact,
}