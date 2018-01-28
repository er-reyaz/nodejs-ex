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

// Get Single Task
router.get('/task/:id', function(req, res, next){
    db.tasks.findOne({_id: mongojs.ObjectId(req.params.id)},function(err, task){
        if(err){
            res.send(err);
        }else {
            res.json(task);
        }
    });
});

// Save Task
router.post('/task', function(req, res, next){
    var task = req.body;
    if(!task.title || !(task.isDone + '')){
        res.status(400);
        res.json({
            "error": "Bad Data"
        });
    }else {
        db.tasks.save(task, function(err, task){
            if(err){
                res.send(err);
            }else {
                res.json(task);
            }
        });
    }
});

// Delete Task
router.delete('/task/:id', function(req, res, next){
    db.tasks.remove({_id: mongojs.ObjectId(req.params.id)},function(err, task){
        if(err){
            res.send(err);
        }else {
            res.json(task);
        }
    });
});

// Update Task
router.put('/task/:id', function(req, res, next){
    var task = req.body;
    var updTask = {};

    if(task.isDone){
        updTask.isDone = task.isDone;
    }

    if(task.title){
        updTask.title = task.title;
    }

    if(!updTask){
        res.status(400);
        res.json({
            "error": "Bad Data"
        });
    }else {
        db.tasks.update({_id: mongojs.ObjectId(req.params.id)},updTask, {}, function(err, task){
        if(err){
            res.send(err);
        }else {
            res.json(task);
        }
    });
    }
});

module.exports = router;