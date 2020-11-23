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

app.get('/api', function (req, res) {
    res.send('hello world');
})


// USER
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
            res.send(true);
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
                    res.send(true);
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

// ROOM
app.get('/api/room/:id', (req, res) => {
    let sql = "SELECT * FROM rooms WHERE id = ?"
    db.query(sql, [req.params.id], (err, result) => {
        if (err) throw err;
        console.log(sql);
        res.send(result[0])
    })
})
app.get('/api/room/type_id/:id', (req, res) => {
    let sql = "SELECT * FROM rooms WHERE type_id = ?"
    db.query(sql, [req.params.id], (err, result) => {
        if (err) throw err;
        console.log(sql);
        res.send(result)
    })
})
app.get('/api/room/type_id/:type_id/building_id/:building_id', (req, res) => {
    let sql = "SELECT * FROM rooms WHERE type_id = ? AND building_id = ?"
    db.query(sql, [req.params.type_id, req.params.building_id], (err, result) => {
        if (err) throw err;
        console.log(sql);
        res.send(result)
    })
})
app.get('/api/room/type_id/:type_id/building_id/:building_id/floor/:floor', (req, res) => {
    let sql = "SELECT * FROM rooms WHERE type_id = ? AND building_id = ? AND floor = ?"
    db.query(sql, [req.params.type_id, req.params.building_id, req.params.floor], (err, result) => {
        if (err) throw err;
        console.log(sql);
        res.send(result)
    })
})

// TYPE
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

// ROOM IMAGE
app.get('/api/room_images/room_id/:id', (req, res) => {
    let sql = "SELECT * FROM room_images WHERE room_id = ?"
    db.query(sql, [req.params.id], (err, result) => {
        if (err) throw err;
        console.log(sql);
        res.send(result)
    })
})

// BUILDING
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

// BOOKING REQUEST
app.route('/api/booking_requests')
    .get((req, res) => {
        let sql = "SELECT * FROM booking_requests"
        db.query(sql, (err, result) => {
            if (err) throw err;
            console.log(sql);
            res.send(result)
        })
    })
    .post((req, res) => {
        let sql = "INSERT INTO booking_requests (user_id, room_id, admin_id, checkIn_at, status, created_at) " +
                    "VALUES (?, ?, ?, ?, ?)"
        db.query(sql, [req.body.user_id, req.body.room_id, req.body.admin_id, req.body.checkIn_at, req.body.status, req.body.created_at], (err, result) => {
            if (err) throw(err);
            console.log(sql);
            res.send(true)
        })
    })

// BILL
app.get('/api/bills', (req, res) => {
    let sql = "SELECT * FROM bills"
    db.query(sql, (err, result) => {
        if (err) throw err;
        console.log(sql);
        res.send(result)
    })
})
app.get('/api/bills/room_id/:id', (req, res) => {
    let sql = "SELECT * FROM bills WHERE room_id = ?"
    db.query(sql, [req.params.id], (err, result) => {
        if (err) throw err;
        console.log(sql);
        res.send(result)
    })
})
app.get('/api/bills', (req, res) => {
    let sql = "SELECT * FROM bills"
    db.query(sql, (err, result) => {
        if (err) throw err;
        console.log(sql);
        res.send(result)
    })
})



app.listen(PORT, () => {
    console.log("Start server at PORT", PORT);
})