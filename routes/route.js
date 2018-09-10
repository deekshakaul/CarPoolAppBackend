var express = require("express");
var router = express.Router();
var dbModule = require("../public/javascripts/dbModule");
var session = require("express-session");


router.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
     next();
 }); 

router.post("/offer_ride", function(req, res) {
    console.log("U are in /offer_ride directory.", req);
    // console.log(req.query.username);
    dbModule.registerDetails(req, res);
});

router.get("/show_ride", function(req, res) {
    console.log("U are in /show_ride directory.",req.query);
    var show = req.query.show
    // console.log(req.query.username);
    dbModule.getOffers(show, res);
});

router.get("/get_myride", function(req, res){
console.log("am in get my ride");
var rideId = req.query.rideId;
dbModule.getMyRide(rideId, res);
});
router.post("/signup", function(req, res){
    console.log("am in signup")
    var username = req.body.username;
    var email = req.body.email;
    var password = req.body.password;
    dbModule.signup(username, email, password, res);
})

router.post('/book_ride',function(req, res){
    //res.send("hello express root home");
    console.log("request",req.body.ridee)
    var name = req.body.name;
    console.log("request",req.body.name)
    var car = req.body.car;
    var seatsLeft = req.body.availableSeats;
    var pickUp = req.body.startPoint;
    var destination = req.body.endPoint;
    var offerId = req.body.id;
    var ridee = req.body.ridee;
 
    dbModule.bookRide(name,car, seatsLeft,pickUp,destination,offerId,ridee,res)
});
router.post('/cancel_ride',function(req, res){
    console.log(req.query);
    var rideId = req.query.rideId;
    console.log("++++++++++++++++++",rideId);
    dbModule.cancelRide(rideId, res);
})

router.post('/login', function(req, res) {
    console.log("Request For Login Received",req.body);
     var username = req.body.username;
     var password= req.body.password;
     console.log(req.body);
     dbModule.authenticateUser(username,password,res);
});

// router.get('/logout', function(req, res) {
//     console.log("Request For Logout Received");
//  res.json(jsonFile3);
// }); 

router.get('/', function(req, res) {
    console.log("Request For Logout Received");
    res.json({"message": "Welcome to Carpoolz application"});
}); 

// router.get('/logout', function(req, res){
//     req.logout();
//     res.redirect('/');
//   });

router.get('/logout', function (req, res) {
    delete req.session;
    res.redirect('/');
  });



module.exports = router;
