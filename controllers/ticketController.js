import fetch from 'node-fetch';
import myLogger from '../winstonLog/winston.js';
import mongoose from 'mongoose';
import doenvt from 'dotenv';
import TicketStore from "../models/AllTickets.js";
import Ticket from '../models/Ticket.js';
import BookTicket from '../models/BookTicket.js';
import Insurance from '../models/insurance.js'
import trainTickets from '../models/GetAllTau.js';
doenvt.config();

const urlTicket = "https://dsvn.vn/api/banveweb/SearchTauByGaDiGaDenNgayXP"
export async function getInforTicket(from, to, departureDate, arrivalDate, isOneWay, code) {
    const objTicket = {
        1: from,
        2: to,
        3: departureDate,
        4: arrivalDate,
        5: isOneWay,
        6: code
    };
    const body = JSON.stringify(objTicket);
    // myLogger.info(body);
    return await fetch(urlTicket, {
        method: 'POST',
        body,
        headers: { 'Content-Type': 'application/json' }
    }).then(response =>
        response.json()
    ).then(json => {
        let { TauDis } = json;
        let { BookingCode } = json;
        let data = [
        ];
        TauDis.forEach(taudi => {
            let { Id, MacTau, NgayDi, NgayDen, GioDi, GioDen, BangGiaVes, ToaXes, TongChoCon, TongChoLock } = taudi;
            let giaVes = [];
            BangGiaVes.forEach(banggiave => {
                let { Id, LoaiCho, TenLoaiCho, GiaVe, Chos, Thue, PhiTra, BaoHiem } = banggiave;
                giaVes.push({ Id, LoaiCho, TenLoaiCho, GiaVe, Chos, Thue, PhiTra, BaoHiem });
            })
            let toaXes = [];
            ToaXes.forEach(ToaXe => {
                let { Id, ToaSo, ToaSoSX, ToaXeDienGiai, ToaXeStatus, NhomChoWeb } = ToaXe;
                toaXes.push({ Id, ToaSo, ToaSoSX, ToaXeDienGiai, ToaXeStatus, NhomChoWeb });
            })
            data.push({ Id, MacTau, NgayDi, NgayDen, GioDi, GioDen, giaVes, toaXes, TongChoCon, TongChoLock });
            const post = new trainTickets({
                _id: Id,
                MacTau: MacTau,
                NgayDi: NgayDi,
                NgayDen: NgayDen,
                GioDi: GioDi,
                GioDen: GioDen,
                GiaVes: giaVes,
                toaXes: toaXes,
                TongChoCon: TongChoCon,
                TongChoLock: TongChoLock
            });
            post.save();
        });

        let ret = {
            data,
            BookingCode,
        };
        return ret;
    });
}

export function TicketByTrain(req, res) {
    trainTickets.findById(req.params.id)
        .select('GiaVes.Id GiaVes.LoaiCho')
        .then((single) => {
            let { GiaVes, toaXes } = single;
            res.status(200).json({
                GiaVes,
                toaXes
            })
        })
        .catch((err) => {
            res.status(500).json({
                success: false,
                error: err.message,
            })
        })
}
export async function bookTicket(req, res) {
    let { trainId, trainCode, bookingCode, tickets} = req.body;
    tickets.forEach(ticket => {
        let {Id, quantity, unitPrice} = ticket;

    });
}




// export async function getTicket(from, to, arrivalDate) {
//     const params = {
//         maGaDen: from,
//         maGaDi: to,
//         ngayDi: arrivalDate
//     };
//     const urlWagon = `https://k.vnticketonline.vn/api/GTGV/LoadDmTau?maGaDen=${encodeURIComponent(params.maGaDen)}&maGaDi=${encodeURIComponent(params.maGaDi)}&ngayDi=${encodeURIComponent(params.ngayDi)}`;
//     const body = JSON.stringify(params.objSeat);
//     return await fetch(urlWagon, {
//         method: 'GET',
//         body,
//         headers: { 'Content-Type': 'application/json' }
//     }).then(response =>
//         response.json()
//     ).then(json => {
//         let ret = [];
//         json.forEach(taudi => {
//             let { Id, MaGaDi, MaGaDen, NgayDen, NgayDi, TenGaDen, TenGaDi, GioDen, GioDi } = taudi;
//             ret.push({ Id, MaGaDi, MaGaDen, NgayDen, NgayDi, TenGaDen, TenGaDi, GioDen, GioDi })
//         })
//         return ret;
//     })
// }

// export async function getOneTrain(id) {
//     const params = { tauId: id }
//     const urlOneTrain = `https://k.vnticketonline.vn/api/GTGV/LoadOneTau?tauId=${encodeURIComponent(params.tauId)}`
//     const body = JSON.stringify(params.objSeat);
//     return await fetch(urlOneTrain, {
//         method: 'GET',
//         body,
//         headers: { 'Content-Type': 'application/json' }
//     }).then(response =>
//         response.json()
//     ).then(json => {
//         let AllTicket = [];
//         let { BangGiaVes } = json;
//         BangGiaVes.forEach(giaVe => {
//             let { Id, DMTauID, LoaiCho, TenLoaiCho, GiaVe } = giaVe;
//             AllTicket.push({ Id, DMTauID, LoaiCho, TenLoaiCho, GiaVe })
//         })
//         return { AllTicket };
//     })
// }

export async function getAllGa() {
    const urlGa = "https://k.vnticketonline.vn/api/GTGV/LoadDmGa";
    return await fetch(urlGa, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
    }).then((response) => response.json())
        .then(json => {
            let ret = [];
            json.forEach(ga => {
                let { Id, TenGa, MaGa } = ga
                ret.push({ Id, TenGa, MaGa })
            })
            return ret
        })
}

function generate_string(n = 5) {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for (var i = 0; i < n; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
}


const username = process.env.USER;
const password = process.env.PASSWORD;
const cluster = process.env.CLUSTER;
const dbname = process.env.DBNAMEBOOK;


mongoose.connect(`mongodb+srv://${username}:${password}@${cluster}.zb1d0j8.mongodb.net/${dbname}?retryWrites=true&w=majority`);


// export async function saveTicketToDB(id) {
//     const params = { tauId: id }
//     const urlOneTrain = `https://k.vnticketonline.vn/api/GTGV/LoadOneTau?tauId=${encodeURIComponent(params.tauId)}`
//     const body = JSON.stringify(params.objSeat);
//     const bookCode = generate_string();

//     return await fetch(urlOneTrain, {
//         method: 'GET',
//         body,
//         headers: { 'Content-Type': 'application/json' }
//     }).then(response =>
//         response.json()
//     ).then(json => {
//         let AllTicket = [];
//         let { Id, MaGaDi, TenGaDi, MaGaDen, TenGaDen, GaDenKM, NgayDi, NgayDen, MacTau, GioDi, GioDen, NgayXP } = json;
//         let { BangGiaVes } = json;
//         BangGiaVes.forEach(giaVe => {
//             let { Id, DMTauID, LoaiCho, TenLoaiCho, GiaVe } = giaVe;
//             AllTicket.push({ Id, DMTauID, LoaiCho, TenLoaiCho, GiaVe })
//         })
//         const ret = { Id, MaGaDi, TenGaDi, MaGaDen, TenGaDen, GaDenKM, NgayDi, NgayDen, MacTau, GioDi, GioDen, NgayXP, bookCode, AllTicket }
//         const post = new TicketStore({
//             _id: ret.Id,
//             MaGaDi: ret.MaGaDi,
//             TenGaDi: ret.TenGaDi,
//             MaGaDen: ret.MaGaDen,
//             TenGaDen: ret.TenGaDen,
//             GaDenKM: ret.GaDenKM,
//             NgayDi: ret.NgayDi,
//             NgayDen: ret.NgayDen,
//             MacTau: ret.MacTau,
//             GioDi: ret.GioDi,
//             GioDen: ret.GioDen,
//             NgayXP: ret.NgayXP,
//             bookCode: ret.bookCode,
//             AllTicket: ret.AllTicket
//         })
//         post.save();
//         return ret;
//     })
// }

// export function getAllTicketByTrain(req, res) {
//     TicketStore.findById(req.params.id)
//         .select('AllTicket')
//         .then((single) => {
//             let { AllTicket } = single;
//             let TicketIds = [];
//             AllTicket.forEach(ticket => {
//                 let { Id, DMTauID, LoaiCho, TenLoaiCho, GiaVe, status } = ticket;
//                 const post = new Ticket({
//                     _id: Id,
//                     LoaiCho: LoaiCho,
//                     DMTauID: DMTauID,
//                     TenLoaiCho: TenLoaiCho,
//                     GiaVe: GiaVe,
//                     BookingCode: generate_string(),
//                     status: status
//                 })
//                 post.save();
//             });

//             res.status(200).json({
//                 success: true,
//                 AllTicket
//             })

//         })
//         .catch((err) => {
//             res.status(500).json({
//                 success: false,
//                 error: err.message,
//             })
//         })
// }

// export function buyTicket(req, res) {
//     Ticket.findById(req.params.id)
//         .then((single) => {
//             let { _id, DMTauID, LoaiCho, TenLoaiCho, GiaVe, status, BookingCode } = single
//             const post = new BookTicket({
//                 idTicket: _id,
//                 DMTauID: DMTauID,
//                 LoaiCho: LoaiCho,
//                 TenLoaiCho: TenLoaiCho,
//                 GiaVe: GiaVe,
//                 status: status,
//                 BookingCode: BookingCode,
//                 Total: GiaVe
//             })
//             post.save();
//             const post02 = new Insurance({
//                 idTicket: _id,
//                 DMTauID: DMTauID,
//                 LoaiCho: LoaiCho,
//                 TenLoaiCho: TenLoaiCho,
//                 GiaVe: GiaVe,
//                 status: status,
//                 BookingCode: BookingCode,
//                 Total: GiaVe,
//                 Code: generate_string()
//             })
//             post02.save();
//             res.status(200).json({
//                 single
//             })
//         })
//         .catch((err) => {
//             res.status(500).json({
//                 success: false,
//                 error: err.message,
//             })
//         })
// }

// export function updateTicket(req, res) {
//     Ticket.findByIdAndUpdate({ _id: req.params.id }, { $set: req.body })
//         .exec()
//         .then(() => {
//             res.status(200).json({
//                 success: true
//             })
//         })
//         .catch((err) => {
//             res.status(500).json({
//                 success: false,
//                 error: err.message,
//                 message: `Server error.Please try again later`
//             })
//         })
// }
