import { Pet } from "../models/pet"
import { v2 as cloudinary } from 'cloudinary'

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

export {
  addPhoto
}