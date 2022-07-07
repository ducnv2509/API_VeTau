import { json } from 'express';
import fetch from 'node-fetch';
import myLogger from '../winstonLog/winston.js';



// const urlTicket = "https://dsvn.vn/api/banveweb/SearchTauByGaDiGaDenNgayXP"
// export async function getInforTicket(from, to, departureDate, arrivalDate, isOneWay, code) {
//     const objTicket = {
//         1: from,
//         2: to,
//         3: departureDate,
//         4: arrivalDate,
//         5: isOneWay,
//         6: code
//     };
//     const body = JSON.stringify(objTicket);
//     // myLogger.info(body);
//     return await fetch(urlTicket, {
//         method: 'POST',
//         body,
//         headers: { 'Content-Type': 'application/json' }
//     }).then(response =>
//         response.json()
//     ).then(json => {
//         let { TauDis } = json;
//         let { BookingCode } = json;
//         let data = [
//         ];

//         TauDis.forEach(taudi => {
//             let { Id, MacTau, NgayDi, NgayDen, GioDi, GioDen, BangGiaVes, ToaXes } = taudi;
//             let giaVes = [];
//             BangGiaVes.forEach(banggiave => {
//                 let { Id, LoaiCho, TenLoaiCho, GiaVe, Chos, Thue, PhiTra, BaoHiem } = banggiave;
//                 giaVes.push({ Id, LoaiCho, TenLoaiCho, GiaVe, Chos, Thue, PhiTra, BaoHiem });
//             })
//             let toaXes = [];
//             ToaXes.forEach(ToaXe => {
//                 let { Id, ToaSo, ToaSoSX, ToaXeDienGiai, ToaXeStatus, NhomChoWeb } = ToaXe;
//                 toaXes.push({ Id, ToaSo, ToaSoSX, ToaXeDienGiai, ToaXeStatus, NhomChoWeb });
//             })
//             data.push({ Id, MacTau, NgayDi, NgayDen, GioDi, GioDen, giaVes, toaXes });
//         });
//         let ret = {
//             data,
//             BookingCode
//         };
//         return ret;
//     });
// }




export async function getTicket(from, to, arrivalDate) {
    const params = {
        maGaDen: from,
        maGaDi: to,
        ngayDi: arrivalDate
    };
    const urlWagon = `https://k.vnticketonline.vn/api/GTGV/LoadDmTau?maGaDen=${encodeURIComponent(params.maGaDen)}&maGaDi=${encodeURIComponent(params.maGaDi)}&ngayDi=${encodeURIComponent(params.ngayDi)}`;
    const body = JSON.stringify(params.objSeat);
    return await fetch(urlWagon, {
        method: 'GET',
        body,
        headers: { 'Content-Type': 'application/json' }
    }).then(response =>
        response.json()
    ).then(json => {
        let ret = [];
        json.forEach(taudi => {
            let { Id, MaGaDi, MaGaDen, NgayDen, NgayDi, TenGaDen, TenGaDi, GioDen, GioDi } = taudi;
            ret.push({ Id, MaGaDi, MaGaDen, NgayDen, NgayDi, TenGaDen, TenGaDi, GioDen, GioDi })
        })
        return ret;
    })
}

export async function getOneTrain(id) {
    const params = { tauId: id }
    const urlOneTrain = `https://k.vnticketonline.vn/api/GTGV/LoadOneTau?tauId=${encodeURIComponent(params.tauId)}`
    const body = JSON.stringify(params.objSeat);
    return await fetch(urlOneTrain, {
        method: 'GET',
        body,
        headers: { 'Content-Type': 'application/json' }
    }).then(response =>
        response.json()
    ).then(json => {
        let AllTicket = [];
        let { BangGiaVes } = json;
        BangGiaVes.forEach(giaVe => {
            let { Id, DMTauID, LoaiCho, TenLoaiCho, GiaVe } = giaVe;
            AllTicket.push({ Id, DMTauID, LoaiCho, TenLoaiCho, GiaVe })
        })
        return { AllTicket };
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
            let {Id, TenGa, MaGa} = ga
            ret.push({Id, TenGa, MaGa})
        })
        return ret
    })
}
