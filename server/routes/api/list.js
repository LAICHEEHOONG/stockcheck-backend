
const express = require('express');
let router = express.Router();

const { Stock } = require('../../models/stock_model');

router.route('/')
    .post(async (req, res) => {
        try {
            const zone = req.body.zone;
            const zoneStockData = await Stock.findOne({ zone });

            res.json({ stockData: zoneStockData });

        } catch (err) {
            res.status(500).json({ msg: 'get stock data errors', errors: err });
        }

    })


const setSidArr = async (id, stock, sid, account, qty) => {
    try {
        let singleProduct = stock.find(obj => obj._id.toString() === id);
        let sidArr = singleProduct.sid;
        let findUser = sidArr.find(obj => obj.sid === sid);
        if (findUser === undefined) {
            let pushData = await Stock.updateOne({ 'stock._id': id }, { '$push': { 'stock.$.sid': { name: account, times: qty, sid: sid } } });
        } else {
            let oldQty = sidArr.find(obj => obj.sid === sid).times;
            findUser.times = oldQty + qty;

            let filterUser = sidArr.filter(obj => obj.sid !== sid);
            let newSidArr = filterUser.push(findUser);
            // console.log(filterUser);
            let setData = await Stock.updateOne({ 'stock._id': id }, { '$set': { 'stock.$.sid': filterUser } });

        }

    } catch (err) {
        console.log(err, 'setSidArr errors');
    }
}

router.route('/edit')
    .post(async (req, res) => {
        try {
            const product = req.body.product
            const id = product._id;
            const qty = req.body.qty;
            const resetQty = req.body.resetQty;
            const account = req.body.account;
            const sid = req.body.sid;


            if (resetQty === '') {
                let stockData = await Stock.find({ 'stock._id': id });
                stockData = stockData[0].stock;
                let onHandQty = stockData.find(obj => obj._id.toString() === id).onHandQty;
                let updateData = await Stock.updateOne({ 'stock._id': id }, { '$set': { 'stock.$.onHandQty': `${onHandQty + qty}` } });

                setSidArr(id, stockData, sid, account, qty);

                res.json({ msg: 'update' });
            } else if (qty === '') {
                let stockData = await Stock.find({ 'stock._id': id });
                stockData = stockData[0].stock;
                let resetData = await Stock.updateOne({ 'stock._id': id }, { '$set': { 'stock.$.sysQty': `${resetQty}` } })
                res.json({ msg: 'reset' });
            }



        } catch (err) {
            console.log(err);
            res.status(500).json({ msg: 'get stock data errors', errors: err })
        }
    })
    .patch(async (req, res) => {
        try {
            // console.log(req.body);
            const {zone, product, found, ean} = req.body;
            let pushData = await Stock.updateOne({ zone }, { '$push': { 'stock': {ean: ean, productName: product, sysQty: 0, onHandQty: found} } });

            res.json({ msg: 'new item uploaded' })

        } catch (err) {
            console.log({ msg: 'new item upload errors', errors: err });
            res.json({ msg: 'new item upload errors', errors: err });
        }

    })








module.exports = router;

