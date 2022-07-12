import fetch from 'node-fetch';
import myLogger from '../winstonLog/winston.js';
import mongoose from 'mongoose';
import doenvt from 'dotenv';
import trainTickets from '../models/GetAllTau.js';
import BookTicket from '../models/BookTicket.js';
import Insurance from '../models/insurance.js'
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
        .select('GiaVes')
        .then((single) => {
            let { GiaVes } = single;
            res.status(200).json({
                GiaVes,
            })
        })
        .catch((err) => {
            res.status(500).json({
                success: false,
                error: err.message,
            })
        })
}
export function bookTicket(req, res) {
    let { trainID, trainCode, tickets } = req.body;
    tickets.forEach(ticket => {
        let { Id, quantity, unitPrice } = ticket;
        let totalPrice = quantity * unitPrice
        const postBook = new BookTicket({
            trainID: trainID,
            trainCode: trainCode,
            codeBH: generate_string(),
            TotalBH: 5000,
            bookingCode: generate_string(),
            tickets:
                [
                    {
                        Id: Id,
                        quantity: quantity,
                        unitPrice: unitPrice
                    }
                ],
            Total: totalPrice,
        })
        const postInsurance = new Insurance({
            trainID: Id,
            trainCode: trainCode,
            codeBH: generate_string(),
            TotalBH: 5000,
            bookingCode: generate_string(),
            tickets:
                [
                    {
                        Id: Id,
                        quantity: quantity,
                        unitPrice: unitPrice
                    }
                ],
            Total: totalPrice,
        })
        postBook.save();
        postInsurance.save();
        res.status(200).json({
            postBook
        })
    })



}


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

