import mongoose from "mongoose";
mongoose.Promise = global.Promise;


const Ticket = new mongoose.Schema({
    _id: {
        type: Number,
        required: true,
    },
    DMTauID: {
        type: Number,
        required: true,
    },
    LoaiCho: {
        type: String,
        required: true,
    },
    TenLoaiCho: {
        type: String,
        required: true,
    },
    GiaVe: {
        type: Number,
        required: true,
    },
    status: {
        type: Boolean,
        default: true,
        required: true,
    },
    BookingCode:{
        type: String,
        required: true,
    }

})


export default mongoose.model('Ticket', Ticket)
