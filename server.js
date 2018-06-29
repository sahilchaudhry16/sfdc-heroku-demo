var express = require('express');
var bodyParser = require('body-parser');
var pg = require('pg');

var app = express();

app.set('port', process.env.PORT || 5000);

app.use(express.static('public'));
app.use(bodyParser.json());

app.get('/api/selectAccount', function(req,res) {
    console.log('Db url', process.env.DATABASE_URL);
    pg.connect('postgres://cdfbwviosuncnf:6c3b6526ed134fe49c0679ea892b796c3b30a707e9bf28f7d90679020efe82fe@ec2-54-227-247-225.compute-1.amazonaws.com:5432/d4di08hvdg5gto', function (err, conn, done) {
    if (err) res.status(400).json({error: 'Error in connecting'});
    if(!conn) res.status(400).json({error: 'Connection failed'});
    conn.query(
        'SELECT * FROM salesforce.Account WHERE LIMIT 5', function(err,result) {
            if (err) {
                res.status(400).json({error: err.message});
            }
            else {
                done();
                result.dbUrl = process.env.DATABASE_URL;
                res.json(result.rows);
            }
        }
    );
    });
});

app.get('/api/selectContact', function(req,res) {
    console.log('Db url', process.env.DATABASE_URL);
    pg.connect('postgres://cdfbwviosuncnf:6c3b6526ed134fe49c0679ea892b796c3b30a707e9bf28f7d90679020efe82fe@ec2-54-227-247-225.compute-1.amazonaws.com:5432/d4di08hvdg5gto', function (err, conn, done) {
    if (err) res.status(400).json({error: 'Error in connecting'});
    if(!conn) res.status(400).json({error: 'Connection failed'});
    conn.query(
        'SELECT * FROM salesforce.Contact LIMIT 5', function(err,result) {
            if (err) {
                res.status(400).json({error: err.message});
            }
            else {
                done();
                result.dbUrl = process.env.DATABASE_URL;
                res.json(result.rows);
            }
        }
    );

    });
});

app.get('/api/selectOpportunity', function(req,res) {
    console.log('Db url', process.env.DATABASE_URL);
    pg.connect('postgres://cdfbwviosuncnf:6c3b6526ed134fe49c0679ea892b796c3b30a707e9bf28f7d90679020efe82fe@ec2-54-227-247-225.compute-1.amazonaws.com:5432/d4di08hvdg5gto', function (err, conn, done) {
    if (err) res.status(400).json({error: 'Error in connecting'});
    if(!conn) res.status(400).json({error: 'Connection failed'});
    conn.query(
        'SELECT * FROM salesforce.Opportunity LIMIT 5', function(err,result) {
            if (err) {
                res.status(400).json({error: err.message});
            }
            else {
                done();
                result.dbUrl = process.env.DATABASE_URL;
                res.json(result.rows);
            }
        }
    );

    });
});


app.listen(app.get('port'), function () {
    console.log('Express server listening on port ' + app.get('port'));
});
