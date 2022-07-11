import mongoose from "mongoose";
mongoose.Promise = global.Promise;


const BookTicket = new mongoose.Schema({
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
    Thue: {
        type: Number,
        required: true,
    },
    PhiTra: {
        type: Number,
        required: true,
    },
    BaoHiem: {
        type: Number,
        required: true,
    },
    Chos: {
        type: Number,
        required: true,
    },
    BookingCode: {
        type: String,
        required: true,
    },
    Total: {
        type: Number,
        required: true,
    }

})


export default mongoose.model('BookTicket', BookTicket)
