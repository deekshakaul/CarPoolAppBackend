var mongoose = require("mongoose");
const AutoIncrement = autoIncrement = require('mongoose-auto-increment');
mongoose.connect("mongodb://localhost/carpoolz");


var offersSchema = mongoose.Schema({
    offerId: { type: Number, default: 1000, unique: true },
    name: String,
    car: String,
    seatsLeft: Number,
    pickUp: String,
    destination: String
});

AutoIncrement.initialize(mongoose.connection);
offersSchema.plugin(AutoIncrement.plugin, {
    model: "offersSchema",
    field: "offerId",
    startAt: 1000,
    incrementBy: 1
});

var offer = mongoose.model("offersCollection", offersSchema);
exports.registerDetails = function (req, res) {
    // { name: 'divi',   pickUp:' Hampankatta',   destination:'MNG SEZ',   car: 'Swift',   seatsLeft: 3 }
    // var offer1 = new offer({offerId:1,name:"a",car:"a",seatsLeft:10,pickUp:"a",destination:"a"});
    var offer1 = new offer({
        // offerId:{$inc:1},
        name: req.body.name,
        car: req.body.car,
        seatsLeft: req.body.seatsLeft,
        pickUp: req.body.pickUp,
        destination: req.body.destination
    });
    offer1.save(function (err, offer1) {
        if (err) {
            console.log(err);
            res.json({ "message": "Error registering request", "status": 404 });
        }
        else
            console.log("booking saved");
        res.json({ "message": "Offer added successfully", "status": 200 });
    });
}


// jaishree

var mongojs = require('mongojs');
var url = "mongodb://localhost/carpoolz";
//var db = mongojs.connect(url)

var db = mongojs('mongodb://localhost/carpoolz');

exports.getOffers = function (show, res) {
    if (show == "all") {
        console.log('am in all')
        db.offerscollections.find({}, function (err, offers) {

            if (err || (offers.length == 0)) {
                console.log("Error getting the transactions ");
                res.send(err);
            }
            else {
                console.log("Transactions retrieved")
                var list = offers; // printing an array in js 
                res.send(offers);
            }
        });
    }
    else if (show == "from") {
        db.offerscollections.find({ pickUp: "Telstra" }, function (err, offers) {

            console.log(offers)
            if (err || (offers.length == 0)) {
                console.log("Error getting the transactions ");
                res.send(err);
            }
            else {
                console.log("Transactions retrieved")
                var list = offers; // printing an array in js 
                res.send(offers);
            }
        });
    }
    else if (show == "to") {
        db.offerscollections.find({ destination: "Telstra" }, function (err, offers) {

            if (err || (offers.length == 0)) {
                console.log("Error getting the transactions ");
                res.send(err);
            }
            else {
                console.log("Transactions retrieved")
                var list = offers; // printing an array in js 
                res.send(offers);
            }
        });
    }
}

//jaishree



/// Nandini


// var db = mongojs("mongodb://localhost/carpoolz");
// console.log(db,">>>>>>>>>><><><><")
// var Ride = db.collection('Rides');
// var message = null;

exports.signup = function (username, email, password, res) {
    db.user.insert({ "username": username, "email": email, "password": password, rideId: 0 }, function (err, user) {
        if (err || !user) {
            console.log(err);
        }
        else {
            console.log("User saved", user);
            //res.send({rideId:ride.rideId,seatsLeft:offers.seatsLeft})
            res.send({ message: 'User signed in successfully', status: '200' })
        }
    })
}

exports.getMyRide = function (rideid, res) {
    console.log(typeof rideid, "$$$$$$$$$$4")
    console.log(db,"?????????????????????????");
    db.Rides.find({ rideId: parseInt(rideid) }, function (err, ride) {
        console.log(ride, ">>>>>>>>>>>>>>>")
        if (err || (ride.length == 0)) {
            console.log("Error getting the ride ");
            res.send(err);
        }
        else {
            
            res.send({data: ride});
        }
    });
}

exports.cancelRide = function (rideId, res) {
    db.Rides.update(
        { rideId: parseInt(rideId) },
        { $set: { status: "cancelled" } }, function (err, update) {
            db.user.update(
                { rideId: parseInt(rideId) },
                { $set: { onRide: false, rideId: 0 } }, function (err, data) {
                    db.Rides.find({ rideId: parseInt(rideId) }, function (err, riderName) {
                        console.log("ride details", riderName[0])
                        db.offerscollections.update(
                            { name: riderName[0].riderName },
                            { $inc: { seatsLeft: 1 } }, function (err, seats) {
                                res.send({ ride: riderName[0], state: '200' })
                            })
                    })
                })
        }
    )
}
exports.bookRide = function (name, car, seatsLeft, pickUp, destination, offerId, ridee, res) {
    console.log("db module", name, car, seatsLeft, pickUp, destination, offerId, ridee)
    db.offerscollections.update(
        { offerId: offerId },
        { $inc: { seatsLeft: -1 } }, function (err, update) {

            db.offerscollections.find({ offerId: offerId }, { seatsLeft: 1, _id: 0 }, function (err, offers) {
                db.counter.update(
                    { rideId: "item_id" },
                    { $inc: { sequence_value: 1 } }, function (err, seq) {

                        db.counter.find({}, function (err, count) {

                            db.Rides.insert({ "rideId": count[0].sequence_value, "riderName": name, "rideeName": ridee, "pickUp": pickUp, "destination": destination, "status": "booked" }, function (err, ride) {
                                db.user.update(
                                    { username: ridee },
                                    { $set: { onRide: true, rideId: count[0].sequence_value } }, function (err, data) {
                                        if (err || !ride) {
                                            console.log("ride noy booked");
                                            console.log(err);
                                            res.send({ message: 'Ride not booked', status: '400' });
                                        }
                                        else {
                                            console.log("Ride booked", ride);
                                            //res.send({rideId:ride.rideId,seatsLeft:offers.seatsLeft})
                                            res.send({ "rideId": ride.rideId, "seatsLeft": offers[0].seatsLeft, message: 'Ride booked successfully', status: '200' })
                                        }
                                    })
                            })
                        })
                    })
            })
        })
}

/// Nandini



// febin


var users = mongoose.Schema({
    username: String,
    password: String,
    address: String
});
var user = mongoose.model("User", users);

exports.authenticateUser = function (username, password, response, callback) {
    console.log("usefname and pasword inside db mosule", username, password)
    db.user.find({ "username": username, "password": password }, function (err, users) {
        // console.log("%%%%%%%%%%%%%%%%%%%%%%%%%%%", users)
        if (err || users.length == 0) {
            console.log("Not Authorized user");
            response.json({ "message": "Login Unsuccessful", "status": 401 });

        }
        else {
            console.log("Authorized user", users);
            response.json({ "username": users[0].username, "rideId": users[0].rideId, "message": "Login successful", "status": 200 });
        }
    });
}






// febin