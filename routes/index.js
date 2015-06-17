var express = require('express');
var router = express.Router();
var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('db.sqlite3');

/* GET home page. */
router.get('/', function(req, res, next) {
    console.log("Get!" + req.params.content);
    res.render('index', {
        title: 'Express',
        content: req.param('content'),
        messages: {}
    });
});

/* POST */
router.post('/', function(req, res) {
    db.serialize(function() {
        if(req.param('content')) {
            db.run('insert into messages (content) values (?)', req.param('content'));
        }

        db.all("select content from messages", function(err, rows) {
            if(!err) {
                res.render('index', {
                    title: 'sample',
                    messages: rows
                });
            }
        });
    });
});

module.exports = router;
