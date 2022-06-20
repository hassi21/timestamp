// index.js
// where your node app starts

// init project
var express = require("express");
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
var cors = require("cors");
app.use(cors({ optionsSuccessStatus: 200 })); // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static("public"));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + "/views/index.html");
});

// your first API endpoint...
app.get("/api/hello", function (req, res) {
  res.json({ greeting: "hello API" });
});

app.get("/api/:date?", (req, res) => {
  
  const date = req.params.date;
  if(!date){
    res.json({utc:new Date().toUTCString(),unix: new Date().getTime()})
  }
  console.log(Date.parse(req.params.date));
  console.log("Input:", date);
  console.log("Type:", typeof date," ", new Date(date));
  console.log(
    "regex:",
    date.search(/^dd-/),
    " and Regex2: ",
    date.match(/^[0-9]{6}/)
  );
  if (new Date(date).toString()!= "Invalid Date") {
    let utc = new Date(date);
    console.log("C1");
    // console.log("hehe", utc,"jojo", utc.toUTCString());
    res.json({ unix: utc.getTime(), utc: utc.toUTCString() });
  } else if (date.match(/^[0-9]{6}/)) {
    let unix = new Date(Number(date));
    console.log("C1");
    // console.log("Hello", unix,"P ", date);
    res.json({
      unix: Number(date),
      utc: unix.toUTCString(),
    });
  } else {
    res.json({ error: "Invalid date" });
  }
 
});
// listen for requests :)
var listener = app.listen(3001, function () {
  console.log("Your app is listening on port " + 3001);
});
