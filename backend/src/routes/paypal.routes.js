import express from 'express';
const router = express.Router();

import {
    createOrder,
    captureOrder,
    cancelOrder,
    refundPayment  
} from '../controllers/paypal.controller.js';

router.post('/create-order', createOrder);
router.post('/capture-order', captureOrder);
router.post('/cancel-order', cancelOrder);
router.post('/refund-payment', refundPayment);

export default router;