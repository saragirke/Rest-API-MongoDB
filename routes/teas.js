var express = require("express");
var router = express.Router();

const bodyParser = require("body-parser");
router.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
router.use(bodyParser.json());

/*********************************************
 * Initialize database and connection
 *********************************************/
var mongoose = require("mongoose");
mongoose.set("strictQuery", true);
mongoose.connect("mongodb+srv://Avokado321:GDY1qGbxGV8apOje@cluster0.8yzwcvr.mongodb.net/?retryWrites=true&w=majority", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
mongoose.Promise = global.Promise; // Global use of mongoose

var db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function (callback) {
  // Add the listener for db events
  console.log("Connected to db");

  // Create DB scheme
  var teaSchema = mongoose.Schema({
    name: { type: String, required: true },
    type: { type: String, required: true },
    price: {
      type: Number,
      required: true,
      validate: {
        validator: Number.isInteger,
        message: "{VALUE} is not an integer value",
      },
    },
    amount: {
      type: Number,
      required: true,
      validate: {
        validator: Number.isInteger,
        message: "{VALUE} is not an integer value",
      },
    },
  });

  // Create scheme model
  var Tea = mongoose.model("Tea", teaSchema);

  /*********************************************
   * Get complete tea listing
   *********************************************/
  router.get("/", function (req, res, next) {
    // Läs ut från databasen
    Tea.find(function (err, teas) {
      if (err) return console.error(err);
      var jsonObj = JSON.stringify(teas);
      res.contentType("application/json");
      res.send(jsonObj);
    });
  });

  /*****************************************
  GET tea by id
 ****************************************/
  router.get("/:id", function (req, res, next) {
    var id = req.params.id;
    var ind = -1;

    Tea.find(function (err, teas) {
      if (err) return console.error(err);
      for (var i = 0; i < teas.length; i++) {
        if (teas[i]._id == id) ind = i;
      }
      console.log(teas[ind]);
      res.contentType("application/json");
      res.send(ind >= 0 ? teas[ind] : "{}");
    });
  });

  /*********************************************
   * Add new tea
   *********************************************/
  router.post("/", function (req, res, next) {
    // Create a dokument
    var tea1 = new Tea({
      name: req.body.name,
      type: req.body.type,
      price: req.body.price,
      amount: req.body.amount,
    });
    res.send(tea1);

    // Save new to db
    tea1.save(function (err) {
      if (err) return console.error(err);
    });

    var jsonObj = JSON.stringify(tea1);
    res.contentType("application/json");
    res.send(jsonObj);
  });

  /*********************************************
   * Update tea
   ********************************************/

  router.put("/:id", async (req, res) => {
    try {
      await Tea.findByIdAndUpdate(req.params.id, {
        name: req.body.name,
        type: req.body.type,
        price: req.body.price,
        amount: req.body.amount
      });

      res.send(req.body);

    } catch (err) {
      console.error(err.message);
      res.send(400).send("Server Error");
      res.contentType("application/json");
      res.send();

    }
  });

  /************************************
 Delete tea by id
 ************************************/
  router.delete("/:id", function (req, res, next) {
    var id = req.params.id;

    // Raderar te med _id från databas
    Tea.deleteOne({ _id: id }, function (err) {
      if (err) return handleError(err);
    });
    // Get Tea list
    Tea.find(function (err, teas) {
      if (err) return console.error(err);

      var jsonObj = JSON.stringify(teas);
      res.contentType("application/json");
      res.send(jsonObj);
    });
  });
}); // DB connection

module.exports = router;
