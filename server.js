const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const path = require('path');
const db = require('./db-connection');
const { allowedNodeEnvironmentFlags } = require('process');
const app = express();
app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());

const PORT = process.env.PORT || 9090

// app.use(session({
// 	secret: 'secret',
// 	resave: true,
// 	saveUninitialized: true
// }));

// app.post('/auth', function(req, res) {
// 	var email = req.body.email;
// 	var password = req.body.password;
// 	if (username && password) {
//         connection.query('SELECT * FROM accounts WHERE email = ? AND password = ?', [email, password], 
//         function(error, results, fields) {
// 			if (results.length > 0) {
// 				req.session.loggedin = true;
// 				req.session.email = email;
// 				res.redirect('/home');
// 			} else {
// 				res.send('Incorrect Username and/or Password!');
// 			}			
// 			res.end();
// 		});
// 	} else {
// 		res.send('Please enter Username and Password!');
// 		res.end();
// 	}
// });

app.get('/api', function (req, res) {
    res.send('hello world');
})

// app.get('/api/users', (req, res) => {
//     let sql = "SELECT * FROM USERS"
//     db.query(sql, (err, result) => {
//         if (err) throw err;
//         console.log(sql);
//         res.send(result)
//     });
// })
app.route('/api/users')
    .get((req, res) => {
        let sql = "SELECT * FROM users"
        db.query(sql, (err, result) => {
            if (err) throw err;
            console.log(sql);
            res.send(result)
        });
    })
    .post((req, res) => {
        let sql = "INSERT INTO users (title, first_name, last_name, email, password, gender, role) " +
                    "VALUES (?, ?, ?, ?, ?, ?, ?)"
        db.query(sql, [req.body.title, req.body.first_name, req.body.last_name, req.body.email, req.body.password, req.body.gender, req.body.role], (err, result) => {
            if (err) throw err;
            console.log(sql);
            res.send("Created user " + req.body.email);
        })
    })
    .put((req, res) => {
        let sql = "UPDATE users SET room_id = ?, " + 
                    "title = ?, first_name = ?, last_name = ?, email = ?, birth_date = ?, gender = ?, citizen_id = ?, " + 
                    "address = ?, phone_number_1 = ?, phone_number_2 = ?, money = ?, invited = ?, img = ?, checkIn_at = ? " +
                    "WHERE id = ?"
        db.query(sql, 
                [req.body.room_id, req.body.title, req.body.first_name, req.body.last_name, req.body.email, 
                req.body.birth_date, req.body.gender, req.body.citizen_id, req.body.address, req.body.phone_number_1, 
                req.body.phone_number_2, req.body.money, req.body.invited, req.body.img, req.body.checkIn_at, req.body.id], 
                (err, result) => {
                    if (err) throw err;
                    console.log(sql);
                    res.send("Updated user id" + req.body.id + " " + req.body.email);
                })
    })
app.get('/api/user/:id', (req, res) => {
    let sql = "SELECT * FROM users WHERE id = ?"
    db.query(sql, [req.params.id], (err, result) => {
        if (err) throw err;
        console.log(sql);
        res.send(result[0])
    })
})
app.get('/api/users/room_id/:id', (req, res) => {
    let sql = "SELECT * FROM users WHERE room_id = ?"
    db.query(sql, [req.params.id], (err, result) => {
        if (err) throw err;
        console.log(sql);
        res.send(result);
    })
})
app.get('/api/room/:id', (req, res) => {
    let sql = "SELECT * FROM rooms WHERE id = ?"
    db.query(sql, [req.params.id], (err, result) => {
        if (err) throw err;
        console.log(sql);
        res.send(result[0])
    })
})
app.get('/api/types', (req, res) => {
    let sql = "SELECT * FROM types"
    db.query(sql, [req.params.id], (err, result) => {
        if (err) throw err;
        console.log(sql);
        res.send(result)
    })
})
app.get('/api/type/:id', (req, res) => {
    let sql = "SELECT * FROM types WHERE id = ?"
    db.query(sql, [req.params.id], (err, result) => {
        if (err) throw err;
        console.log(sql);
        res.send(result[0])
    })
})
app.get('/api/room_images/room_id/:id', (req, res) => {
    let sql = "SELECT * FROM room_images WHERE room_id = ?"
    db.query(sql, [req.params.id], (err, result) => {
        if (err) throw err;
        console.log(sql);
        res.send(result)
    })
})
app.get('/api/buildings', (req, res) => {
    let sql = "SELECT * FROM buildings"
    db.query(sql, (err, result) => {
        if (err) throw err;
        console.log(sql);
        res.send(result)
    })
})
app.get('/api/building/:id', (req, res) => {
    let sql = "SELECT * FROM buildings WHERE id = ?"
    db.query(sql, [req.params.id], (err, result) => {
        if (err) throw err;
        console.log(sql);
        res.send(result[0])
    })
})

app.post('/api/test', (req, res) => {
    console.log(req.body.name);
    console.log(req.body.role);
    res.send(req.body);
})

  
app.listen(PORT, () => {
    console.log("Start server at PORT", PORT);
})