import { Router } from 'express'
import { decodeUserFromToken, checkAuth } from '../middleware/auth.js'
import * as vetsCtrl from '../controllers/vets.js'

const router = Router()

// ========== Public Routes ===========


// ========= Protected Routes ========= 
router.use(decodeUserFromToken)
router.get('/', checkAuth, vetsCtrl.indexVet)
router.post('/', checkAuth, vetsCtrl.createVet)
router.get('/:id', checkAuth, vetsCtrl.showVet)
// router.put('/:id', checkAuth, vetsCtrl.updateVet)
// router.delete('/:id', checkAuth, vetsCtrl.delete)



export { router }