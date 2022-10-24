import { Router } from 'express'
import * as profileCtrl from '../controllers/profile.js'
import { decodeUserFromToken, checkAuth } from '../middleware/auth.js'

const router = Router()

/*---------- Public Routes ----------*/


/*---------- Protected Routes ----------*/
router.use(decodeUserFromToken)
// router.get('/', checkAuth, profilesCtrl.index)
router.get('/:id', checkAuth, profileCtrl.show)
router.put('/:id/add-photo', checkAuth, profileCtrl.addPhoto)

export { router }
