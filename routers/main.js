import express from 'express';
import {TicketByTrain, getInforTicket, bookTicket } from '../controllers/ticketController.js';


// app.get('/api/getTau', async (req, res) => {
//     let { from, to, arrivalDate } = req.query;
//     let response = await getTicket(from, to, arrivalDate);
//     res.status(200).send(response);
// })

// app.get('/api/getVe', async (req, res) => {
//     let { Id } = req.query;
//     let response = await getOneTrain(Id);
//     res.status(200).send(response);
// })

// app.get('/api/getLocationGa', async (req, res) => {
//     let response = await getAllGa();
//     res.status(200).send(response);
// })



const router = express.Router();

router.get('/getAllTau/', async (req, res) => {
    let { from, to, departureDate, arrivalDate, isOneWay, code } = req.query;
    let response = await getInforTicket(from, to, departureDate, arrivalDate, isOneWay, code);
    res.status(200).send(response);
})


// router.get('/getVe', async (req, res) => {
//     let { Id } = req.query;
//     let response = await getOneTrain(Id);
//     res.status(200).send(response);
// })

// router.get('/getLocationGa', async (req, res) => {
//     let response = await getAllGa();
//     res.status(200).send(response);
// })

// router.get('/saveTicketToDB', async (req, res) => {
//     let { Id } = req.query;
//     let response = await saveTicketToDB(Id);
//     res.status(200).send(response);
// })

router.get('/TicketByTrain/:id', TicketByTrain)
router.post('/bookTicket', bookTicket)
// router.get('/buyTicket/:id', buyTicket)
// router.put('/buyTicket/:id', updateTicket)

export default router;
