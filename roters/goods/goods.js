import express from 'express';
import Goods from '../../controller/GoodsController';
const router = express.Router();

router.post('/list', Goods.list)
router.post('/add', Goods.add)

export default router