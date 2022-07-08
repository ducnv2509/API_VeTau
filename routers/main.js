import express from 'express';
import { getAllGa, getTicket, getOneTrain } from '../controllers/ticketController.js';


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

router.get('/getTau', async (req, res) => {
    let { from, to, arrivalDate } = req.query;
    let response = await getTicket(from, to, arrivalDate);
    res.status(200).send(response);
})


router.get('/getVe', async (req, res) => {
    let { Id } = req.query;
    let response = await getOneTrain(Id);
    res.status(200).send(response);
})

router.get('/getLocationGa', async (req, res) => {
    let response = await getAllGa();
    res.status(200).send(response);
})

export default router;
