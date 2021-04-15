//Kashish Sachdeva

const express = require('express');
const app = express();
const port = 8887;
const bodyParser = require('body-parser');


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use((req, res, next) => {
res.header("Access-Control-Allow-Origin", "*");
res.header("Access-Control-Allow-Methods",
"PUT, PATCH, DELETE");
res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
next();
})
app.listen(port, () => console.log(`Server running at localhost:
${port}!`))


//import the module odm lib : mongoose
const mongoose = require('mongoose')

//define a structure
const schema = new mongoose.Schema(
  {
    active : String,
    location_id : Number,
    location_name : String,
    operated_by : String,
    city : String,
    address : String,
    postal_code : String,
    province : String,
    phone : String 
  }
);
//define document model

const model = mongoose.model('vaccine', schema, 'vaccine')


//establish a connection to the database
const DataBase = 'mongodb://localhost:27017/covid19';
mongoose.connect(DataBase, {useNewUrlParser: true,
  useUnifiedTopology: true}).then(
  () => {
    app.get('/retrieve', (req, res) => {
      model.find()
      .then(
      result => {
      res.send(result);
      },
      err => { res.send(err.message); } )
      .catch( err => { console.log(err); } );
      });

    },
    err => { console.log(err); }
    );
  


const schema1 = new mongoose.Schema(
      {
        location_id : Number,
        date : String,
        time : String,
        ohip : String,
        email : String
      }
    );
const model1 = mongoose.model('datetime', schema1, 'datetime')
const DataBase1 = 'mongodb://localhost:27017/covid19';
mongoose.connect(DataBase1, {useNewUrlParser: true,
  useUnifiedTopology: true}).then(
  () => {
    app.post('/insertCenterInfo', (req, res) => {
      console.log("its coming here???")
      
      input = req.body.params;
      model1.create(input)
      .then(
      result => {
      res.send({"message": 'Record added'});
      console.log("hogya");
      },
      err => { res.send(err.message); } )
      .catch( err => { console.log(err); } );
      });

  app.get('/retrieveCenterInfo', (req, res) => {
        model1.find()
        .then(
        result => {
        res.send(result);
        },
        err => { res.send(err.message); } )
        .catch( err => { console.log(err); } );
        });

  app.put('/updateCenterInfo', (req, res) => {
        input = req.body.params;
        console.log(input.date +" " + input.time +" " + input.ohip +" " + input.email)
        model1.updateOne({ location_id : input.location_id}, {$set:{
          "date" : input.date,
          "time"  : input.time,
          "ohip" : input.ohip,
          "email" : input.email
        }})
        .then(
        result => {
        console.log("hogya ya nahi")
        res.send({"message": 'Record updated'});
        },
        err => { res.send(err.message); } )
        .catch( err => { console.log(err); } );
        });


        app.get('/nodeExport', (req, res) => {
          let exec = require('child_process').exec
          let command = 'mongoexport -d covid19 -c datetime -o output.json'
          exec(command, (error, stdout, stderr) => {
          if (error) {
          console.log(`error: ${error}`);
          res.send(error);
          } else if (stderr) {
          console.log(`stderr: ${stderr}`);
          res.send(stderr);
          } else if (stdout) {
          console.log(`stdout: ${stdout}`);
          res.send(stdout);
          } else { res.send('Error'); }
          })
          });
    app.delete('/deleteCenterInfo', (req, res) => {
      input = req.body.params;
      model1.deleteOne(input)
      .then(
      result => {
      res.send({"message": 'Record added'});
      },
      err => { res.send(err.message); } )
      .catch( err => { console.log(err); } );
      });
    app.delete('/removeCenterInfo', (req, res) => {
          model1.remove({})
          .then(
          result => {
          res.send({"message": 'Record added'});
          },
          err => { res.send(err.message); } )
          .catch( err => { console.log(err); } );
          });
},
err => { console.log(err); }
);

  
  

