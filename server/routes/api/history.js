const express = require('express');
const { History00, History01, History02, History03, History04, History05, History06, History07, History08, History09} = require('../../models/history_model');
let router = express.Router();

router.route('/')
    .post(async(req, res) => {
        try {
            const zone = req.body.zone;
            // console.log(zone, 'find')
            let historyData;
            if(zone === '00') {
                historyData = await History00.find({}).sort({time: 'desc'});
            }
            if(zone === '01') {
                historyData = await History01.find({}).sort({time: 'desc'});
            }
            if(zone === '02') {
                historyData = await History02.find({}).sort({time: 'desc'});
            }
            if(zone === '03') {
                historyData = await History03.find({}).sort({time: 'desc'});
            }
            if(zone === '04') {
                historyData = await History04.find({}).sort({time: 'desc'});
            }
            if(zone === '05') {
                historyData = await History05.find({}).sort({time: 'desc'});
            }
            if(zone === '06') {
                historyData = await History06.find({}).sort({time: 'desc'});
            }
            if(zone === '07') {
                historyData = await History07.find({}).sort({time: 'desc'});
            }
            if(zone === '08') {
                historyData = await History08.find({}).sort({time: 'desc'});
            }
            if(zone === '09') {
                historyData = await History09.find({}).sort({time: 'desc'});
            }
            res.json({historyData});

        } catch(err) {
            console.log(err);
            res.json({err});
        }
    })

 router.route('/singleData')
    .post(async(req, res) => {
        try {
            const zone = req.body.zone;
            const id = req.body.id;
            let historySingleData;

            if(zone === '00') {
                historySingleData = await History00.findById(id);
            }
            if(zone === '01') {
                historySingleData = await History01.findById(id);
            }
            if(zone === '02') {
                historySingleData = await History02.findById(id);
            }
            if(zone === '03') {
                historySingleData = await History03.findById(id);
            }
            if(zone === '04') {
                historySingleData = await History04.findById(id);
            }
            if(zone === '05') {
                historySingleData = await History05.findById(id);
            }
            if(zone === '06') {
                historySingleData = await History06.findById(id);
            }
            if(zone === '07') {
                historySingleData = await History07.findById(id);
            }
            if(zone === '08') {
                historySingleData = await History08.findById(id);
            }
            if(zone === '09') {
                historySingleData = await History09.findById(id);
            }

            res.json({historySingleData});

        } catch(err) {
            console.log(err);
            res.json({errors: 'get single history data errors.'});
        }
    })   


module.exports = router;