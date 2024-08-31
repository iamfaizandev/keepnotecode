var express = require("express");
var mongoClient = require("mongodb").MongoClient;
var cors = require("cors");
var connectionString = "mongodb://127.0.0.1:27017";
// var connectionString =
//   "mongodb+srv://mdfaizanahmadweb:clouddb@fzn@08@cluster0.k04pdyw.mongodb.net/?retryWrites=true&w=majority";

var app = express();

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/", (req, res) => {
  res.send(`<h3>To Do Apps</h3>
  <p>Testing APi</p>`);
});

app.get("/appointments", (req, res) => {
  mongoClient.connect(connectionString).then((clientObject) => {
    var database = clientObject.db("fzkeep");
    database
      .collection("appointments")
      .find({})
      .toArray()
      .then((documents) => {
        res.send(documents);
        res.end();
      });
  });
});

app.get("/appointments/:id", (req, res) => {
  var id = parseInt(req.params.id);
  mongoClient.connect(connectionString).then((clientObject) => {
    var database = clientObject.db("fzkeep");
    database
      .collection("appointments")
      .find({ Id: id })
      .toArray()
      .then((documents) => {
        res.send(documents);
        res.end();
      });
  });
});

app.post("/addtask", (req, res) => {
  var task = {
    Id: parseInt(req.body.Id),
    Title: req.body.Title,
    Date: new Date(req.body.Date),
    Description: req.body.Description,
  };
  mongoClient.connect(connectionString).then((clientObject) => {
    var database = clientObject.db("fzkeep");
    database
      .collection("appointments")
      .insertOne(task)
      .then(() => {
        console.log("Task Added");
        res.end();
      });
  });
});

app.put("/edittask/:id", (req, res) => {
  var id = parseInt(req.params.id);
  mongoClient.connect(connectionString).then((clientObject) => {
    var database = clientObject.db("fzkeep");
    database
      .collection("appointments")
      .updateOne(
        { Id: id },
        {
          $set: {
            Id: parseInt(req.body.Id),
            Title: req.body.Title,
            Date: new Date(req.body.Date),
            Description: req.body.Description,
          },
        }
      )
      .then(() => {
        console.log("Task Updated");
        res.end();
      });
  });
});

app.delete("/deletetask/:id", (req, res) => {
  var id = parseInt(req.params.id);
  mongoClient.connect(connectionString).then((clientObject) => {
    var database = clientObject.db("fzkeep");
    database
      .collection("appointments")
      .deleteOne({ Id: id })
      .then(() => {
        console.log("Deleted Task");
        res.end();
      });
  });
});
///////////////Users

app.get("/users", (req, res) => {
  mongoClient.connect(connectionString).then((clientObject) => {
    var database = clientObject.db("fzkeep");
    database
      .collection("users")
      .find()
      .toArray()
      .then((documents) => {
        res.send(documents);
        res.end();
      });
  });
});

//////////////Register User

app.post("/registeruser", (req, res) => {
  var user = {
    FirstName: req.body.FirstName,
    LastName: req.body.LastName,
    Email: req.body.Email,
    Password: req.body.Password,
  };
  mongoClient.connect(connectionString).then((clientObject) => {
    var database = clientObject.db("fzkeep");
    database
      .collection("users")
      .insertOne(user)
      .then(() => {
        console.log("Registered");
        res.end();
      });
  });
});

///////////////////////Basic Info
// app.post("/registeruser", (req, res) => {
//   var basicInfo = {
//     Gender: req.body.Gender,
//     Month: req.body.Month,
//     Day: parseInt(req.body.Day),
//     Year: parseInt(req.body.Year),
//   };
//   mongoClient.connect(connectionString).then((clientObject) => {
//     var database = clientObject.db("fzkeep");
//     database
//       .collection("users")
//       .insertOne(basicInfo)
//       .then(() => {
//         console.log("Basic Info Registered");
//         res.end();
//       });
//   });
// });

/////////////// Appointments based on cookies
app.get("/userappointments/:userid", (req, res) => {
  var userid = req.params.userid;
  mongoClient.connect(connectionString).then((clientObject) => {
    var database = clientObject.db("fzkeep");
    database
      .collection("appointments")
      .find({ UserId: userid })
      .toArray()
      .then((documents) => {
        res.send(documents);
        res.end();
      });
  });
});
app.listen(4700);
console.log(`Server Started : http://127.0.0.1:4700`);
