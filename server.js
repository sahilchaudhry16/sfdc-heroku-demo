var express = require('express');
var bodyParser = require('body-parser');
var pg = require('pg');

var app = express();

app.set('port', process.env.PORT || 5000);

app.use(express.static('public'));
app.use(bodyParser.json());

app.post('/update', function(req, res) {
    pg.connect(process.env.DATABASE_URL, function (err, conn, done) {
        // watch for any connect issues
        if (err) console.log(err);
        conn.query(
            'UPDATE salesforce.Contact SET Phone = $1, MobilePhone = $1 WHERE LOWER(FirstName) = LOWER($2) AND LOWER(LastName) = LOWER($3) AND LOWER(Email) = LOWER($4)',
            [req.body.phone.trim(), req.body.firstName.trim(), req.body.lastName.trim(), req.body.email.trim()],
            function(err, result) {
                if (err != null || result.rowCount == 0) {
                  conn.query('INSERT INTO salesforce.Contact (Phone, MobilePhone, FirstName, LastName, Email) VALUES ($1, $2, $3, $4, $5)',
                  [req.body.phone.trim(), req.body.phone.trim(), req.body.firstName.trim(), req.body.lastName.trim(), req.body.email.trim()],
                  function(err, result) {
                    done();
                    if (err) {
                        res.status(400).json({error: err.message});
                    }
                    else {
                        // this will still cause jquery to display 'Record updated!'
                        // eventhough it was inserted
                        res.json(result);
                    }
                  });
                }
                else {
                    done();
                    res.json(result);
                }
            }
        );
    });
});

app.get('/hello', function (req,res) {
    res.send('Hello');
 });

app.get('/api/select', function(req,res) {
    console.log('Db url', process.env.DATABASE_URL);
    pg.connect('postgres://cdfbwviosuncnf:6c3b6526ed134fe49c0679ea892b796c3b30a707e9bf28f7d90679020efe82fe@ec2-54-227-247-225.compute-1.amazonaws.com:5432/d4di08hvdg5gto', function (err, conn, done) {
    if (err) res.status(400).json({error: 'Error in connecting'});
    if(!conn) res.status(400).json({error: 'Connection failed'});
    conn.query(
        'SELECT * FROM salesforce.Account', function(err,result) {
            if (err) {
                res.status(400).json({error: err.message});
            }
            else {
                done();
                result.dbUrl = process.env.DATABASE_URL;
                res.json(result);
            }
        }
    );

    });
});

app.listen(app.get('port'), function () {
    console.log('Express server listening on port ' + app.get('port'));
});
