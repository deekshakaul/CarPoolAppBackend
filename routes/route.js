var express = require("express");
var router = express.Router();
var dbModule = require("../public/javascripts/dbModule");
var session = require("express-session");

router.post("/offer_ride", function(req, res) {
    console.log("U are in /offer_ride directory.");
    // console.log(req.query.username);
    dbModule.registerDetails(req, res);
});

router.get("/show_ride", function(req, res) {
    console.log("U are in /offer_ride directory.");
    // console.log(req.query.username);
    dbModule.getOffers(req, res);
});



router.post('/book_ride',function(req, res){
    //res.send("hello express root home");
    console.log("request",req.body.ridee)
    var name = req.body.rider.name;
    console.log("request",req.body.rider.name)
    var car = req.body.rider.car;
    var seatsLeft = req.body.rider.seatsLeft;
    var pickUp = req.body.rider.pickUp;
    var destination = req.body.rider.destination;
    var offerId = req.body.rider.offerId;
    var ridee = req.body.ridee;
 
    dbModule.bookRide(name,car, seatsLeft,pickUp,destination,offerId,ridee,res)
});
router.post('/cancel_ride',function(req, res){
    console.log(req.body);
    var rideId = req.body.rideId;
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
    res.send({"message": "Welcome to Carpoolz application"});
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