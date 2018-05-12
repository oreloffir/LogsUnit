var express = require('express');
var config = require('../resources/config');
var router = express.Router();
var storageManager = require('../managers/storage-manager');
var spawn = require("child_process").spawn;
var pythonShell = require('python-shell');


router.get('/', function(req, res, next) {
    console.log('Forms page GET request');

    var model = {
        User: req.user,
        pageToken: config.page_tokens.forms
    };

    res.render('forms', model);

});

router.post('/audit-file', function(req, res, next) {
    console.log('Forms page GET request');
    console.log('request: ', req.body);

    var model = {
        User: req.user,
        pageToken: config.page_tokens.forms
    };

    var filePath = req.body.filePath
    var auditValue = auditVal(req.body['audit[]']);
    console.log("filePath: ", filePath);
    console.log("auditValue: ", auditValue);

    var options = {
        mode: 'text',
        pythonOptions: ['-u'],
        args: [filePath, auditValue]
    };
        console.log('PythonShell options:', options);

    pythonShell.run('C:\\Users\\Logs Unit\\Desktop\\LogsUnit\\scripts\\auditFile.py', options, function (err, results) {
        console.log('PythonShell:');
        if (err)
            console.log('PythonShell: err: ', err);
        // results is an array consisting of messages collected during execution
        if(results)
            results.forEach(function (res) {
                console.log(res);
            })
        // console.log('results: %o', results);
    });

    res.render('forms', model);
});

function auditVal(audit) {
    var auditValue = 0;
    console.log('auditVal: ', auditValue);
    if(parseInt(audit[0])) //full control
    {
    console.log('auditVal: full');
        return 2032639;
    }
    if(parseInt(audit[1])) // read
    {
    console.log('auditVal: read');
        auditValue = auditValue | 1179785;
    }
    if(parseInt(audit[2])) // write
    {
    console.log('auditVal: write');
        auditValue = auditValue | 1179926;
    }
    if(parseInt(audit[3])) // exec
    {
    console.log('auditVal: exec');
        auditValue = auditValue | 1179808;
    }

    console.log('auditVal: ', auditValue);
    return auditValue;
}
function ensureAuthenticated(req, res, next){
    if(req.isAuthenticated()){
        return next();
    } else {
        console.log('You are not logged in');
        res.redirect('/users/login');
    }
}


module.exports = router;