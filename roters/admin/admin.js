import express from 'express';
import Admin from '../../controller/AdminController';
import Check from '../../middlewares/check';
const router = express.Router();
router.post('/register', Admin.register )

router.post('/login', Admin.login )
router.post('/list', Check.checkSuperAdmin, Admin.list )
router.post('/delete', Admin.delete )

export default router