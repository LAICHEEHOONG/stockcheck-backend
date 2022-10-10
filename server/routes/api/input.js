const express = require('express');
let router = express.Router();

const { Stock } = require('../../models/stock_model');


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

router.route('/')
    .post(async (req, res) => {
        try {

            const item = req.body.item;
            let qty = Math.round(req.body.qty)
            const id = item._id;
            const sid = req.body.sid;
            const account = req.body.account



            // const product = req.body.product
            // const id = product._id;
            // const qty = req.body.qty;
            // const account = req.body.account;
            // const sid = req.body.sid;

            let stockData = await Stock.find({ 'stock._id': id });
            stockData = stockData[0].stock;
            let onHandQty = stockData.find(obj => obj._id.toString() === id).onHandQty;
            let updateData = await Stock.updateOne({ 'stock._id': id }, { '$set': { 'stock.$.onHandQty': `${onHandQty + qty}` } });

            setSidArr(id, stockData, sid, account, qty);

            item.onHandQty = onHandQty + qty;

            res.json({ item });


  



        } catch (err) {
            console.log(err);
            res.status(500).json({ msg: 'get stock data errors', errors: err })
        }
    })


    module.exports = router;