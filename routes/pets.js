import { Router } from 'express'
import { decodeUserFromToken, checkAuth } from '../middleware/auth.js'
import * as petsCtrl from '../controllers/pets.js'

const router = Router()

// ========== Public Routes ===========


// ========= Protected Routes ========= 
router.use(decodeUserFromToken)
router.get('/', checkAuth, petsCtrl.index)
router.post('/', checkAuth, petsCtrl.create)
router.post('/:id/emergency-contact', checkAuth, petsCtrl.createContact)
router.get('/:id', checkAuth, petsCtrl.show)
router.put('/:id', checkAuth, petsCtrl.update)
router.put('/:id/add-photo', petsCtrl.addPhoto)
router.delete('/:id', checkAuth, petsCtrl.delete)
router.delete('/:petId/emergencyContact/:cId', checkAuth, petsCtrl.deleteContact)


export { router }