/* ======================================== */
/* =                                      = */
/*   INDEX                          	    */
/* =                                      = */
/* ======================================== */


const http = require('http');
//const queryString = require("querystring");
const express = require("express");
const app = express();
const router = express.Router();
const request = require("request");
const jwt = require('jsonwebtoken');

/*
    ### CSS GENERATOR ###
    This route calls a stream created by the "getSASS" function on "app.js"
    The only streams that will be available are the files at the root
    of "__src/sass/" directory, so if you have a "page.scss" at the root
    the stream will be pulled at "/css/page.css"
*/
router.get("/css/:file([0-9a-zA-Z\._-]+.(css))", (req, res) => {
    let css = (req.params.file) ? req.params.file : null;
    let stylesheet = (css) ? req.streams[css] : null;
    if (!stylesheet) res.status(404).send("Invalid File or File Not Found");
    else {
        res.set("Content-Type", "text/css");
        res.send(stylesheet.css);
    }
});

// ~~~~~~~~~~~~~~~~~~~~~
// ### HOME PAGE ###

// TEST
// router.get('/',function(req,res){
//     res.json({'message' : 'Ping Successfull'});
//   });

// router.get('/', function (req, res) {
//     res.render("index");
//     })

router.route('/')
.get((req, res) => {
    res.render("index");
})

.post((req, res) => {
    // console.log('inside post login');
    var jwt = req.cookies.jwt;
    var _data = JSON.stringify(jwt);
    // console.log(JSON.stringify(_data));


    var options = { method: 'POST',
    url: 'http://localhost:3000/jwt-test/api/validate_token.php',
    body: _data };

    request(options, function (error, response, body) {
    if (error) throw new Error(error);

    console.log(body);

    var res_data = JSON.parse(body);
    console.log('jwt token: ', res_data.jwt);
    console.log('res.message: ', res_data.message);
    if(res.message = "Successful login."){
    res.cookie('jwt', res_data.jwt, { maxAge: 86400000, httpOnly: true });
    res.redirect('/');
    } else {
        console.log('there was a problem.')
    }
    });
})

router.get('/account', function (req, res) {
    res.render("account");
    })

router.route('/login')
    .get((req, res) => {
        res.render("login");
    })

    .post((req, res) => {
        var _data = JSON.stringify(req.body);
        var options = { method: 'POST',
        url: 'http://localhost:3000/jwt-test/api/login.php',
        body: _data };

        request(options, function (error, response, body) {
        if (error) throw new Error(error);

        var res_data = JSON.parse(body);

        if(res.message = "Successful login."){
        res.cookie('jwt', res_data.jwt, { maxAge: 86400000, httpOnly: true });
        res.redirect('/');
        } else {
            console.log('there was a problem.')
        }
        });
    })

router.route("/signup")
    .get((req, res) => {
        res.render("signup");
    })
    
    .post((req, res) => {
        var _data = JSON.stringify(req.body);
        console.log(JSON.stringify(_data));
        var options = { method: 'POST',
        url: 'http://localhost:3000/jwt-test/api/create_user.php',
        body: _data };

        request(options, function (error, response, body) {
        if (error) throw new Error(error);

        res.redirect('/');

        });


    })

module.exports = router;