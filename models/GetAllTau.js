import mongoose from "mongoose";
mongoose.Promise = global.Promise;


const trainTickets = new mongoose.Schema({
    Id: {
        type: Number,
        required: true,
    },
    MacTau: {
        type: String,
        required: true,
    },
    NgayDi: {
        type: Date,
        required: true,
    },
    NgayDen: {
        type: Date,
        required: true,
    },
    GioDi: {
        type: String,
        required: true,
    },
    GioDen: {
        type: String,
        required: true,
    },
    GiaVes: [{
        Id: {
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
        Chos: {
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
        }
    }],
    toaXes: [{
        Id: {
            type: Number,
            required: true,
        },
        ToaSo: {
            type: String,
            required: true,
        },
        ToaSoSX: {
            type: Number,
            required: true,
        },
        ToaXeDienGiai: {
            type: String,
            required: true,
        },
        ToaXeStatus: {
            type: Number,
            required: true,
        },
        NhomChoWeb: {
            type: String,
            required: true,
        }
    }],
    TongChoCon: {
        type: Number,
        required: true,
    },
    TongChoLock: {
        type: Number,
        required: true,
    }

})


export default mongoose.model('trainTickets', trainTickets)
