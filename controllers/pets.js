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
    const pets = await Pet.find({})
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

export {
  create,
  addPhoto,
  index,
  show,
  update,
}