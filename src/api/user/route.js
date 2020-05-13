import express from 'express';
import { create, getReport } from './controller';

const router = express.Router();


router.get('/create', create)

router.get('/getReport', getReport)



export default router;