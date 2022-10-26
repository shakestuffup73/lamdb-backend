import { Profile } from '../models/profile.js'
import { v2 as cloudinary } from 'cloudinary'

const show = async (req, res) => {
  try {
    const profile = await Profile.findById(req.user.profile)
      .populate('pets')
      console.log('this is controller show profile', req.user.profile);
    res.status(200).json(profile)
  } catch (error) {
    console.log(error);
    res.status(500).json(err)
  }
}

function addPhoto(req, res) {
  const imageFile = req.files.photo.path
  Profile.findById(req.params.id)
  .then(profile => {
    cloudinary.uploader.upload(imageFile, {tags: `${req.user.email}`})
    .then(image => {
      profile.photo = image.url
      profile.save()
      .then(profile => {
        res.status(201).json(profile.photo)
      })
    })
    .catch(err => {
      console.log(err)
      res.status(500).json(err)
    })
  })
}

export { addPhoto, show }
