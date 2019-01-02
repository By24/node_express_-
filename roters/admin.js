import express from 'express';
import Admin from '../controller/admin';
import Check from '../middlewares/check';
const router = express.Router();
router.post('/register', Admin.register )

router.post('/login', Admin.login )
router.post('/all', Check.checkSuperAdmin,Admin.all )
router.post('/delete', Admin.delete )


router.get('/index', function (req, res) {
    res.render('index.html')
})
export default router