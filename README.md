# CarPoolAppBackend

navigate to the directory containing the apploication

make sure mongodb is installed in your system

run ``` npm install``` to install the dependencies

start the mongodb service

run the following commands in mongo shell :
``` 
use carpoolz
db.counter.insert({rideId:"item_id",sequence_value:1000})
```

run ```npm run start``` to start the backend server
