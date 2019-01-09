import express from 'express';
import Member from '../../controller/MemberController';
const router = express.Router();

router.post('/register', Member.register )
router.post('/login', Member.login )

export default router
