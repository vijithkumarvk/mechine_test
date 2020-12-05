let app = require('express')();

const amqp = require('amqplib/callback_api');
require('dotenv').config()

let bodyParser = require('body-parser');

let mongoose = require('mongoose');

let apiRoutes = require('./routes/api-routes');

app.use(bodyParser.urlencoded({ extended: true }));

app.use(bodyParser.json());

amqp.connect(process.env.RABBITMQ_HOST, function (error, connection) {
    if (error) {
        throw error;
    }
    connection.createChannel(function (channelError, channel) {
        if (channelError) {
            throw channelError;
        }
        require('./controllers/queConsumers')(channel);
        global.channel = channel;
    });

});

mongoose.connect(`${process.env.MONGO_HOST}/${process.env.MONGO_DB}`, { useNewUrlParser: true, useUnifiedTopology: true });

global.db = mongoose.connection;

if (!global.db) {
    throw "Db connection failed.!"
} else {
    console.log(`Db connected.!`);
}

app.use('/api', apiRoutes);
app.get('/', (req, res) => res.send('Hello world.!'));


var port = process.env.PORT || 3000
app.listen(port, () => {
    console.log(`Running server at ${port}`);
})