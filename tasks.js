var express = require('express');
var router = express.Router();
var mongojs = require('mongojs');
// var db = mongojs('mongodb://reyaz:reyaz@ds139979.mlab.com:39979/tasklist', ['tasks']);//cloud
 var db = mongojs('mongodb://reyaz:reyaz@ds235807.mlab.com:35807/nse'); // 'actual,virtual,profit,nselist'
// mongodb://<dbuser>:<dbpassword>@ds139979.mlab.com:39979/tasklist
//var db = mongojs('mongodb://127.0.0.1:27017/tasklist', ['tasks']);//local

// Get All Virtual
router.get('/virtual', function(req, res, next){
    db.virtual.find(function(err, table){
        if(err){
            res.send(err);
        }else {
            res.json(table);
        }
    });
});

router.get('/actual', function(req, res, next){
    db.actual.find(function(err, table){
        if(err){
            res.send(err);
        }else {
            res.json(table);
        }
    });
});

router.get('/profit', function(req, res, next){
    db.profit.find(function(err, table){
        if(err){
            res.send(err);
        }else {
            res.json(table);
        }
    });
});

router.get('/nselist', function(req, res, next){
    db.nselist.find(function(err, table){
        if(err){
            res.send(err);
        }else {
            res.json(table);
        }
    });
});

// Get Single record
router.get('/actual/:id', function(req, res, next){
    db.actual.findOne({_id: mongojs.ObjectId(req.params.id)},function(err, task){
        if(err){
            res.send(err);
        }else {
            res.json(task);
        }
    });
});

// Save record
router.post('/actual', function(req, res, next){
    var record = req.body;
    if(!record){
        res.status(400);
        res.json({
            "error": "Bad Data"
        });
    }else {
        db.actual.save(record, function(err, record){
            if(err){
                res.send(err);
            }else {
                res.json(record);
            }
        });
    }
});

// Delete record
router.delete('/actual/:id', function(req, res, next){
    db.actual.remove({_id: mongojs.ObjectId(req.params.id)},function(err, actual){
        if(err){
            res.send(err);
        }else {
            res.json(actual);
        }
    });
});

// Update record
router.put('/actual/:id', function(req, res, next){
    var record = req.body;
    var updRecord = {
        $set: {quantity:record.quantity,
        buyPrice:record.buyPrice,
        startDate:record.startDate,
        zeroLoss:record.zeroLoss}
    };
    if(!updRecord){
        res.status(400);
        res.json({
            "error": "Bad Data"
        });
    }else {
       db.actual.update({_id: mongojs.ObjectId(req.params.id)}, updRecord, function(err, record){
        if(err){
            res.send(err);
        }else {
            res.json(record);
        }
   });
    }
});

module.exports = router;