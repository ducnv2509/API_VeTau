import express from 'express';
import {TicketByTrain, getInforTicket, bookTicket, getAllGa } from '../controllers/ticketController.js';




const router = express.Router();

router.get('/api/getLocationGa', async (req, res) => {
    let response = await getAllGa();
    res.status(200).send(response);
})

router.get('/getAllTau/', async (req, res) => {
    let { from, to, departureDate, arrivalDate, isOneWay, code } = req.query;
    let response = await getInforTicket(from, to, departureDate, arrivalDate, isOneWay, code);
    res.status(200).send(response);
})



router.get('/TicketByTrain/:id', TicketByTrain)
router.post('/bookTicket', bookTicket)


export default router;
