import express from 'express';
import { getAllGa, getTicket, getOneTrain } from './controllers/ticketController.js';

const app = express();

app.use(express.json());



// app.post('/api/ticket/', async (req, res) => {
//     let { from, to, departureDate, arrivalDate, isOneWay, code } = req.body;
//     let response = await getInforTicket(from, to, departureDate, arrivalDate, isOneWay, code);
//     res.status(200).send(response);
// })

app.get('/api/getTau', async (req, res) => {
    let { from, to, arrivalDate } = req.query;
    let response = await getTicket(from, to, arrivalDate);
    res.status(200).send(response);
})

app.get('/api/getVe', async (req, res) => {
    let { Id } = req.query;
    let response = await getOneTrain(Id);
    res.status(200).send(response);
})

app.get('/api/getLocationGa', async (req, res) => {
    let response = await getAllGa();
    res.status(200).send(response);
})
const port = process.env.PORT || 3000
app.listen(port, () => console.log(`Listening on port ${port}..`))