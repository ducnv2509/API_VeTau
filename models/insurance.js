import mongoose from "mongoose";
mongoose.Promise = global.Promise;


const Insurance = new mongoose.Schema({
    idTicket: {
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
    BookingCode: {
        type: String,
        required: true,
    },
    Code: {
        type: String,
        required: true,
    },
    Total: {
        type: Number,
        required: true,
    }

})


export default mongoose.model('Insurance', Insurance)
