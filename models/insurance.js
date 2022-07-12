import mongoose from "mongoose";
mongoose.Promise = global.Promise;


const Insurance = new mongoose.Schema({
    trainID: {
        type: Number,
        required: true,
    },
    trainCode: {
        type: String,
        required: true,
    },
    bookingCode: {
        type: String,
        required: true,
    },
    Total: {
        type: Number,
        required: true,
    },
    TotalBH: {
        type: Number,
        required: true,
    },
    codeBH: {
        type: String,
        required: true,
    },
    tickets: [{
        Id: {
            type: Number,
            required: true,
        },
        quantity: {
            type: Number,
            required: true,
        },
        unitPrice: {
            type: String,
            required: true,
        }
    }],

})


export default mongoose.model('Insurance', Insurance)
