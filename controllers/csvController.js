var csv = require("csvtojson");
const User = require('../models/userModel');
const q = require("./queueController");

exports.send = (req, res) => {
    csv()
        .fromFile(req.file.path)
        .then(function(jsonArrayObj) { //when parse finished, result will be emitted here.
            //    console.log(jsonArrayObj); 
            AlterRecords(jsonArrayObj);
            
        })
}

async function AlterRecords(records){

    for (index in records){
        let item = records[index];
        user = await User.getUser(item.mail)
        if (user) {
            console.log(`replace`);
            (item.content).replace("${name}", user.firstname + user.lastname);
            q.push(item, process.env.QUEUE);
        }
    }
}

