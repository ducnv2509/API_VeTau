import express from 'express';
import mainRoutes from './routers/main.js';
const app = express();

app.use(express.json());

app.use('/api/', mainRoutes);


// app.post('/api/ticket/', async (req, res) => {
//     let { from, to, departureDate, arrivalDate, isOneWay, code } = req.body;
//     let response = await getInforTicket(from, to, departureDate, arrivalDate, isOneWay, code);
//     res.status(200).send(response);
// })


const port = process.env.PORT || 3000
app.listen(port, () => console.log(`Listening on port ${port}..`))