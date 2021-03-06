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
                    "title = ?, first_name = ?, last_name = ?, email = ?, birth_date = ?, citizen_id = ?, " + 
                    "address = ?, phone_number_1 = ?, phone_number_2 = ?, money = ?, invited = ?, img = ?, checkIn_at = ? " +
                    "WHERE id = ?"
        db.query(sql, 
                [req.body.room_id, req.body.title, req.body.first_name, req.body.last_name, req.body.email, 
                req.body.birth_date, req.body.citizen_id, req.body.address, req.body.phone_number_1, 
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
app.put('/api/user/:id/money/:money', (req, res) => {
    let sql = "UPDATE users SET money = ? WHERE id = ?"
    db.query(sql, [req.params.money, req.params.id], (err, result) => {
        if (err) throw err;
        console.log(sql);
        res.send(true);
    })
})
app.put('/api/user/checkIn_at', (req, res) => {
    let sql = "UPDATE users SET room_id = ?, checkIn_at = ? WHERE id = ?"
    db.query(sql, [req.body.room_id, req.body.checkIn_at, req.body.id], (err, result) => {
        if (err) throw err;
        console.log(sql);
        res.send(true);
    })
})

// ROOM
app.get('/api/rooms', (req, res) => {
    let sql = "SELECT * FROM rooms"
    db.query(sql, (err, result) => {
        if (err) throw err;
        console.log(sql);
        res.send(result)
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
app.get('/api/room/building_id/:building_id/floor/:floor/number/:number', (req, res) => {
    let sql = "SELECT * FROM rooms WHERE building_id = ? AND floor = ? AND number = ?"
    db.query(sql, [req.params.building_id, req.params.floor, req.params.number], (err, result) => {
        if (err) throw err;
        console.log(sql);
        res.send(result[0])
    })
})
app.put('/api/room', (req, res) => {
    let sql = "UPDATE rooms SET available = ? WHERE id = ?"
    db.query(sql, [req.body.available, req.body.id], (err, result) => {
        if (err) throw err;
        console.log(sql);
        res.send(true)
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
app.get('/api/building/name/:name', (req, res) => {
    let sql = "SELECT * FROM buildings WHERE name = ?"
    db.query(sql, [req.params.name], (err, result) => {
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
                    "VALUES (?, ?, ?, ?, ?, ?)"
        db.query(sql, [req.body.user_id, req.body.room_id, req.body.admin_id, req.body.checkIn_at, req.body.status, req.body.created_at], (err, result) => {
            if (err) throw(err);
            console.log(sql);
            res.send(true)
        })
    })
    .put((req, res) => {
        let sql = "UPDATE booking_requests SET admin_id = ?, status = ? WHERE id = ?"
        db.query(sql, [req.body.admin_id, req.body.status, req.body.id], (err, result) => {
            if (err) throw(err);
            console.log(sql);
            res.send(true)
        })
    })
app.get('/api/booking_request/:id', (req, res) => {
    let sql = "SELECT * FROM booking_requests WHERE id = ?"
    db.query(sql, [req.params.id], (err, result) => {
        if (err) throw err;
        console.log(sql);
        res.send(result[0])
    })
})
app.delete('/api/booking_request/:id', (req, res) => {
    let sql = "DELETE FROM booking_requests WHERE id = ?"
    db.query(sql, [req.params.id], (err, result) => {
        if (err) throw err;
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
app.get('/api/bill/room_id/:id/activated_at/:activated_at/status/:status', (req, res) => {
    let sql = "SELECT * FROM bills WHERE room_id = ? AND activated_at <= ? AND status = ?"
    db.query(sql, [req.params.id, req.params.activated_at, parseInt(req.params.status)], (err, result) => {
        if (err) throw err;
        console.log(sql);
        res.send(result)
    })
})
app.post('/api/bill', (req, res) => {
    let sql = "INSERT INTO bills (room_id, user_id, water_unit, electric_unit, room_price, total_price, status, activated_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?)"
    db.query(sql, [req.body.room_id, req.body.user_id, req.body.water_unit, req.body.electric_unit, req.body.room_price, req.body.total_price, req.body.status, req.body.activated_at], (err, result) => {
        if (err) throw err;
        console.log(sql);
        res.send(true)
    })
})

// REPORT 
app.get('/api/reports', (req, res) => {
    let sql = "SELECT * FROM reports"
    db.query(sql, (err, result) => {
        if (err) throw err;
        console.log(sql);
        res.send(result)
    })
})
app.get('/api/report/:id', (req, res) => {
    let sql = "SELECT * FROM reports WHERE id = ?"
    db.query(sql, [req.params.id], (err, result) => {
        if (err) throw err;
        console.log(sql);
        res.send(result[0])
    })
})
app.get('/api/reports/status/:status', (req, res) => {
    let status;
    switch (req.params.status) {
        case "1":
            status = "รอการยืนยัน";break;
        case "2":
            status = "อนุมัติ";break;
        case "3":
            status = "บันทึก";break;
    }
    let sql = "SELECT * FROM reports WHERE status = ?"
    db.query(sql, [status], (err, result) => {
        if (err) throw err;
        console.log(sql);
        res.send(result)
    })
})
app.get('/api/reports/status/:status/type/:type', (req, res) => {
    let status, type;
    switch (req.params.status) {
        case "1":
            status = "รอการยืนยัน";break;
        case "2":
            status = "อนุมัติ";break;
        case "3":
            status = "บันทึก";break;
    }
    switch (req.params.type) {
        case "1":
            type = "แจ้งซ่อม";break;
        case "2":
            type = "รายงาน";break;
    }
    let sql = "SELECT * FROM reports WHERE status = ? AND type = ?"
    db.query(sql, [status, type], (err, result) => {
        if (err) throw err;
        console.log(sql);
        res.send(result)
    })
})
app.post('/api/reports', (req, res) => {
    let sql = "INSERT INTO reports (user_id, room_id, title, detail, type, status) VALUES (?, ?, ?, ?, ?, ?)"
    db.query(sql, [req.body.user_id, req.body.room_id, req.body.title, req.body.detail, req.body.type, req.body.status], (err, result) => {
        if (err) throw err;
        console.log(sql);
        res.send(true)
    })
})
app.put('/api/reports', (req, res) => {
    let sql = "UPDATE reports SET status = ? WHERE id = ?"
    db.query(sql, [req.body.status, req.body.id], (err, result) => {
        if (err) throw err;
        console.log(sql);
        res.send(true)
    })
})
app.delete('/api/report/:id', (req, res) => {
    let sql = "DELETE FROM reports WHERE id = ?"
    db.query(sql, [req.params.id], (err, result) => {
        if (err) throw err;
        console.log(sql);
        res.send(true)
    })
})

// PACKAGE
app.get('/api/packages', (req, res) => {
    let sql = "SELECT * FROM packages"
    db.query(sql, (err, result) => {
        if (err) throw err;
        console.log(sql);
        res.send(result)
    })
})
app.get('/api/packages/room_id/:id', (req, res) => {
    let sql = "SELECT * FROM packages WHERE room_id = ?"
    db.query(sql, [req.params.id], (err, result) => {
        if (err) throw err;
        console.log(sql);
        res.send(result)
    })
})
app.get('/api/packages/room_id/:id/status/:status', (req, res) => {
    let sql = "SELECT * FROM packages WHERE room_id = ? AND status = ?"
    db.query(sql, [req.params.id, parseInt(req.params.status)], (err, result) => {
        if (err) throw err;
        console.log(sql);
        res.send(result)
    })
})

// Wifi
app.get('/api/wifi_codes/user_id/:id', (req, res) => {
    let sql = "SELECT * FROM wifi_codes WHERE user_id = ?"
    db.query(sql, [req.params.id], (err, result) => {
        if (err) throw err;
        console.log(sql);
        res.send(result)
    })
})
app.delete('/api/wifi_code/:id', (req, res) => {
    let sql = "DELETE FROM wifi_codes WHERE id = ?"
    db.query(sql, [req.params.id], (err, result) => {
        if (err) throw err;
        console.log(sql);
        res.send(true);
    })
})
app.get('/api/wifi_codes/available/sorted', (req, res) => {
    let sql = "SELECT * FROM wifi_codes WHERE available = 'yes' ORDER BY created_at"
    db.query(sql, (err, result) => {
        if (err) throw err;
        console.log(sql);
        res.send(result);
    })
})
app.put('/api/wifi_codes', (req, res) => {
    let sql = "UPDATE wifi_codes SET duration = ?, available = ?, user_id = ?, expire_at = ? WHERE id = ?"
    db.query(sql, [req.body.duration, req.body.available, req.body.user_id, req.body.expire_at, req.body.id], (err, result) => {
        if (err) throw err;
        console.log(sql);
        res.send(true);
    })
})

// STATEMENT
app.get('/api/user_statements/user_id/:id', (req, res) => {
    let sql = "SELECT * FROM user_statements WHERE user_id = ?"
    db.query(sql, [req.params.id], (err, result) => {
        if (err) throw err;
        console.log(sql);
        res.send(result);
    })
})
app.post('/api/user_statement', (req, res) => {
    let sql = "INSERT INTO user_statements (user_id, price, detail, created_at) VALUES (?, ?, ?, ?)"
    db.query(sql, [req.body.user_id, req.body.price, req.body.detail, req.body.created_at], (err, result) => {
        if (err) throw err;
        console.log(sql);
        res.send(true);
    })
})
app.put('/api/user_statement', (req, res) => {
    let sql = "UPDATE user_statements SET created_at = ? WHERE id = ?"
    db.query(sql, [req.body.user_id, req.body.created_at], (err, result) => {
        if (err) throw err;
        console.log(sql);
        res.send(true);
    })
})

app.listen(PORT, () => {
    console.log("Start server at PORT", PORT);
})