import express from 'express';
import Freight from '../../controller/FreightController';
const router = express.Router();

router.post('/add', Freight.add )

export default router