import { Router } from 'express'
import { decodeUserFromToken, checkAuth } from '../middleware/auth.js'
import * as petsCtrl from '../controllers/pets.js'

const router = Router()

// ========== Public Routes ===========


// ========= Protected Routes ========= 
router.use(decodeUserFromToken)
router.get('/', checkAuth, petsCtrl.index)
router.post('/', checkAuth, petsCtrl.create)
// router.get('/:id', checkAuth, petsCtrl.show)
// router.put('/:id', checkAuth, petsCtrl.update)
// router.delete('/:id', checkAuth, petsCtrl.delete)



export { router }