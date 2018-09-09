var mongoose = require("mongoose");
const AutoIncrement = autoIncrement = require('mongoose-auto-increment');
mongoose.connect("mongodb://localhost/carpoolz");


var offersSchema = mongoose.Schema({
    offerId:{type:Number, default:1000, unique: true},
    name:String,
    car:String,
    seatsLeft:Number,
    pickUp:String,
    destination:String
});

AutoIncrement.initialize(mongoose.connection);
offersSchema.plugin(AutoIncrement.plugin, {
    model:"offersSchema",
    field:"offerId",
    startAt: 1000,
    incrementBy: 1
});

var offer = mongoose.model("offersCollection", offersSchema);
exports.registerDetails = function(req, res) {
    // { name: 'divi',   pickUp:' Hampankatta',   destination:'MNG SEZ',   car: 'Swift',   seatsLeft: 3 }
    // var offer1 = new offer({offerId:1,name:"a",car:"a",seatsLeft:10,pickUp:"a",destination:"a"});
    var offer1 = new offer({
        // offerId:{$inc:1},
        name:req.body.name,
        car:req.body.car,
        seatsLeft:req.body.seatsLeft,
        pickUp:req.body.pickUp,
        destination:req.body.destination
    });
    offer1.save(function(err, offer1){
        if(err) {
            console.log(err);
            res.json({"message":"Error registering request","status":404});
        }
        else 
            console.log("booking saved");
            res.json({"message":"Offer added successfully","status":200});
    });
}


// jaishree

var mongojs = require('mongojs');
var url = "mongodb://localhost/carpoolz";
//var db = mongojs.connect(url)

var db = mongojs('mongodb://localhost/carpoolz');

exports.getOffers = function(req, res) {
    db.offerscollections.find({}, function(err, offers) {
                    
        console.log(offers)
          if(err || (offers.length==0)){
           console.log("Error getting the transactions ");
           res.send(err);
    }
      else{
        console.log("Transactions retrieved")
        console.log(offers)
        var list = offers ; // printing an array in js 
        res.send(offers);
     }
    }); 
}
//jaishree



/// Nandini


var db = mongojs("mongodb://localhost/carpoolz");
var Rides = db.collection('Rides');
var message=null;




exports.cancelRide=function(rideId, res){
    db.Rides.update(
      {rideId: rideId},
      {$set: {status: "cancelled"}},function(err, update){
    db.Rides.find({rideId: rideId}, {riderName: 1, _id:0}, function(err, riderName){
      db.offerscollections.update(
        { name: riderName[0].riderName },
        { $inc: { seatsLeft : 1 } }, function(err, seats){
        res.send({message: 'Ride cancelled successfully', status: '200'})
        })
    })
      }
    )
  }
      exports.bookRide = function(name,car, seatsLeft,pickUp,destination,offerId,ridee,res){
        console.log("db module",name,car, seatsLeft,pickUp,destination,offerId,ridee)
        db.offerscollections.update(
          { offerId: offerId },
          { $inc: { seatsLeft : -1 } }, function(err, update){
  
        db.offerscollections.find( { offerId: offerId }, { seatsLeft: 1, _id: 0 } , function(err, offers){
        db.counter.update(
            { rideId: "item_id" },
            { $inc:{ sequence_value: 1 } }, function(err, seq){
             
        db.counter.find({}, function(err, count){
         
        db.Rides.insert({"rideId":count[0].sequence_value ,"riderName":ridee,"rideeName":name,"pickUp":pickUp,"destination":destination,"status":"booked" },function(err, ride){
        
          if(err || !ride){
            console.log("ride noy booked");
            console.log(err);
            res.send({message: 'Ride not booked', status: '400'});
          }
          else{
            console.log("Ride booked", ride);
            //res.send({rideId:ride.rideId,seatsLeft:offers.seatsLeft})
            res.send({data: {'rideId':ride.riderName,'seatsLeft':offers[0].seatsLeft},message: 'Ride booked successfully', statue: '200'})
          }
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

exports.authenticateUser = function(username,password,response,callback) {
    user.find({"username":username,"password":password}, function(err, users) {
        if(username=="admin" && password== "admin")
        {
            console.log("Authorized user");
            response.json({ "message": "Login successful", "status": 200});
        }
        else
        {
            console.log("Not Authorized user");
            response.json({ "message": "Login Unsuccessful", "status": 401} );
        }      
    });
}






// febin