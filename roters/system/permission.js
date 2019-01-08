import express from 'express';
import Permission from '../../controller/PermissionController';
import Check from '../../middlewares/check';
const router = express.Router();

router.post('/add', Permission.add )

router.get('/index', function (req, res) {
    res.render('index.html')
})
export default router