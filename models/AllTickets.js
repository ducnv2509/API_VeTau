import mongoose from "mongoose";
mongoose.Promise = global.Promise;


const postSchema = new mongoose.Schema({
    _id: {
        type: Number,
        required: true,
    },
    MaGaDi: {
        type: String,
        required: true,
    },
    TenGaDi: {
        type: String,
        required: true,
    },
    MaGaDen: {
        type: String,
        required: true,
    },
    TenGaDen: {
        type: String,
        required: true,
    },
    GaDenKM: {
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
    MacTau: {
        type: String,
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

    NgayXP: {
        type: Date,
        required: true,
    },
    bookCode: {
        type: String,
        required: true,
    },
    AllTicket: [
        {
            Id: {
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
            }
        }
    ]
})

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
    }

})
export default mongoose.model('AllTicket', postSchema)