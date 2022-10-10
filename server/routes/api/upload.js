const express = require('express');
const fs = require('fs');
const csv = require("csvtojson");
const { Stock } = require('../../models/stock_model');
const { History00, History01, History02, History03, History04, History05, History06, History07, History08, History09 } = require('../../models/history_model');
let router = express.Router();


router.route('/')
    .post(async (req, res) => {
        try {

            if (req.files === null) {
                return res.status(400).json({ msg: 'No file uploaded' });
            }

            const file = req.files.file;

            await file.mv(`${__dirname}/../../stock_data.csv`);
            let oldPath = `server/stock_data.csv`;
            let newpath = `server/uploads/stock_data.csv`;

            fs.rename(oldPath, newpath, async (err) => {
                try {
                    console.log('Success move file to uploads folder')
                    const jsonArray = await csv().fromFile(newpath);

                    let stockArr = [];


                    jsonArray.forEach(async (obj) => {
                        let stock = {
                            ean: obj.Text23,
                            productName: obj.Text22,
                            sysQty: obj.Text7.replace(/,/g, '')
                        }
            
                        stockArr.push(stock);
                    })


                    let stockUpload = new Stock({
                        zone: req.body.zone,
                        stock: stockArr
                    })

                    await stockUpload.save();

                    res.json({ fileName: file.name });

                } catch (err) {
                    console.log(err);
                    res.json({ fileName: file.name, msg: 'error' });
                }
            })

        } catch (err) {
            res.json({ msg: 'File upload errors', errors: err });
        }
    })

router.route('/findData')
    .post(async (req, res) => {
        try {
            const zone = req.body.zone;
            // console.log(zone)
            const zoneData = await Stock.find({ zone });




            //let pushData = await Stock.updateOne({ zone }, { '$push': { 'stock': {ean: ean, productName: product, sysQty: 0, onHandQty: found} } });

            res.json({ zoneData });
        } catch (err) {
            console.log(err);
            res.json({ msg: 'find data errors', errors: err });
        }

    })




router.route('/save')
    .post(async (req, res) => {
        try {
            const zone = req.body.zone;
            const date = req.body.date;
            const time = req.body.time;
            const zoneData = await Stock.find({ zone });

            if(zoneData.length === 0) {
                res.json({msg: 'no data to save'});
                return;
            }

            if (zone === '00') {
                const findHistory = await History00.find({}).sort({ time: 'desc' });
                // console.log(findHistory.length)
                if (findHistory.length > 11) {
                    let id = findHistory[findHistory.length - 1]._id;
                    const removeLast = await History00.findByIdAndRemove(id);
                }

                let historyData = new History00({ data: zoneData, date, time });
                await historyData.save();
                let removeStockData = await Stock.findOneAndRemove({ zone });
            }

            if (zone === '01') {
                const findHistory = await History01.find({}).sort({ time: 'desc' });
                // console.log(findHistory.length)
                if (findHistory.length > 11) {
                    let id = findHistory[findHistory.length - 1]._id;
                    const removeLast = await History01.findByIdAndRemove(id);
                }

                let historyData = new History01({ data: zoneData, date, time });
                await historyData.save();
                let removeStockData = await Stock.findOneAndRemove({ zone });
            }

            if (zone === '02') {
                const findHistory = await History02.find({}).sort({ time: 'desc' });
                // console.log(findHistory.length)
                if (findHistory.length > 11) {
                    let id = findHistory[findHistory.length - 1]._id;
                    const removeLast = await History02.findByIdAndRemove(id);
                }

                let historyData = new History02({ data: zoneData, date, time });
                await historyData.save();
                let removeStockData = await Stock.findOneAndRemove({ zone });
            }

            if (zone === '03') {
                const findHistory = await History03.find({}).sort({ time: 'desc' });
                // console.log(findHistory.length)
                if (findHistory.length > 11) {
                    let id = findHistory[findHistory.length - 1]._id;
                    const removeLast = await History03.findByIdAndRemove(id);
                }

                let historyData = new History03({ data: zoneData, date, time });
                await historyData.save();
                let removeStockData = await Stock.findOneAndRemove({ zone });
            }

            if (zone === '04') {
                const findHistory = await History04.find({}).sort({ time: 'desc' });
                // console.log(findHistory.length)
                if (findHistory.length > 11) {
                    let id = findHistory[findHistory.length - 1]._id;
                    const removeLast = await History04.findByIdAndRemove(id);
                }

                let historyData = new History04({ data: zoneData, date, time });
                await historyData.save();
                let removeStockData = await Stock.findOneAndRemove({ zone });
            }

            if (zone === '05') {
                const findHistory = await History05.find({}).sort({ time: 'desc' });
                // console.log(findHistory.length)
                if (findHistory.length > 11) {
                    let id = findHistory[findHistory.length - 1]._id;
                    const removeLast = await History05.findByIdAndRemove(id);
                }

                let historyData = new History05({ data: zoneData, date, time });
                await historyData.save();
                let removeStockData = await Stock.findOneAndRemove({ zone });
            }

            if (zone === '06') {
                const findHistory = await History06.find({}).sort({ time: 'desc' });
                // console.log(findHistory.length)
                if (findHistory.length > 11) {
                    let id = findHistory[findHistory.length - 1]._id;
                    const removeLast = await History06.findByIdAndRemove(id);
                }

                let historyData = new History06({ data: zoneData, date, time });
                await historyData.save();
                let removeStockData = await Stock.findOneAndRemove({ zone });
            }
            if (zone === '07') {
                const findHistory = await History07.find({}).sort({ time: 'desc' });
                // console.log(findHistory.length)
                if (findHistory.length > 11) {
                    let id = findHistory[findHistory.length - 1]._id;
                    const removeLast = await History07.findByIdAndRemove(id);
                }

                let historyData = new History07({ data: zoneData, date, time });
                await historyData.save();
                let removeStockData = await Stock.findOneAndRemove({ zone });
            }
            if (zone === '08') {
                const findHistory = await History08.find({}).sort({ time: 'desc' });
                // console.log(findHistory.length)
                if (findHistory.length > 11) {
                    let id = findHistory[findHistory.length - 1]._id;
                    const removeLast = await History08.findByIdAndRemove(id);
                }

                let historyData = new History08({ data: zoneData, date, time });
                await historyData.save();
                let removeStockData = await Stock.findOneAndRemove({ zone });
            }
            if (zone === '09') {
                const findHistory = await History09.find({}).sort({ time: 'desc' });
                // console.log(findHistory.length)
                if (findHistory.length > 11) {
                    let id = findHistory[findHistory.length - 1]._id;
                    const removeLast = await History09.findByIdAndRemove(id);
                }

                let historyData = new History09({ data: zoneData, date, time });
                await historyData.save();
                let removeStockData = await Stock.findOneAndRemove({ zone });
            }



            res.json({ msg: 'save to history and remove stock counting data'});
        } catch (err) {
            console.log(err);
            res.json({ msg: 'save to history errors', errors: err });
        }
    })







module.exports = router;