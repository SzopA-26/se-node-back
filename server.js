const express = require('express');
// const session = require('express-session');
// const bodyParser = require('body-parser');
// const path = require('path');
const db = require('./db-connection')
const app = express();

const PORT = process.env.PORT || 9090

// app.use(session({
// 	secret: 'secret',
// 	resave: true,
// 	saveUninitialized: true
// }));
// app.use(bodyParser.urlencoded({extended : true}));
// app.use(bodyParser.json());

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

app.get('/api/users', (req, res) => {

    db.query("SELECT * FROM USERS", 
    (err, result) => {
        if (err) throw err;
        console.log(sql);
        res.send(result)
    });
})
  
app.listen(PORT, () => {
    console.log("Start server at PORT", PORT);
})