// const API_KEY = "36b7fc1e272e470b75ffee489af06112-us21";
// const AUDIENCE_KEY = "a3baffc06b";  
// const URL = "https://us21.api.mailchimp.com/3.0/lists/" + AUDIENCE_KEY;

const express = require('express');
const bodyParser = require('body-parser');
const https = require('https');
const request = require("request");

const app = express();
app.use(express.static("static"));
app.use(bodyParser.urlencoded({extended: true}));

// This will run the website on a random port on Heroku server or port 3000 in localhost.
app.listen(process.env.PORT || 3000, function(){
    console.log("Session started");
});

app.get("/", function(req, res){
    res.sendFile(__dirname + "/signUp.html");
});

app.post("/", function(req, res){
    const fname = req.body.username.substring(0, req.body.username.indexOf(' '));
    let lname;
    if (req.body.username.indexOf(' ')){
        lname = req.body.username.substring(req.body.username.indexOf(' ')+1);
    }
    const email = req.body.email;

    const user = {
        members: [{
            email_address: email,
            status: "subscribed",
            merge_fields:{
                FNAME: fname,
                LNAME: lname
            }
        }]
    };

    const jsonData = JSON.stringify(user);
    const API_KEY = "36b7fc1e272e470b75ffee489af06112-us21";
    const AUDIENCE_KEY = "a3baffc06b";
    
    const URL = "https://us21.api.mailchimp.com/3.0/lists/" + AUDIENCE_KEY;
    
    const options = {
        method: "POST",
        auth: "anything:" + API_KEY
    }

    var heading = "", description = "";

    const request_data = https.request(URL, options, function(response){

        const status_code = response.statusCode;
        console.log(status_code);
        if(status_code == 200){
            res.sendFile(__dirname + "/Signin Success.html");
        } else{
            res.sendFile(__dirname + "/Signin Failure.html");

        }
    });
    
    request_data.write(jsonData);
    request_data.end();
    //request_data.render("Signin Failure", {title: heading})
});

app.post("/failure", function(req, res){
    res.redirect("/");
})