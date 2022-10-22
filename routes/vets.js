import { Router } from 'express'
import { decodeUserFromToken, checkAuth } from '../middleware/auth.js'
import * as vetsCtrl from '../controllers/vets.js'

const router = Router()

// ========== Public Routes ===========


// ========= Protected Routes ========= 
router.use(decodeUserFromToken)
router.get('/', checkAuth, vetsCtrl.indexVet)
router.post('/', checkAuth, vetsCtrl.createVet)
// router.get('/:id', checkAuth, vetsCtrl.show)
// router.put('/:id', checkAuth, vetsCtrl.update)
// router.delete('/:id', checkAuth, vetsCtrl.delete)



export { router }