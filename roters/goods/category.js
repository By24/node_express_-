import express from 'express';
import Category from '../../controller/GoodsCategoryController';
const router = express.Router();

router.post('/add', Category.add)

export default router