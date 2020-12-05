// const amqp = require('amqplib/callback_api');
const mailController = require("./mailController");

module.exports = function(channel) {
    // connection.createChannel(function (channelError, channel) {
    //     if (channelError) {
    //         throw channelError;
    //     }

        channel.assertQueue(process.env.QUEUE, {
            durable: true
        });

        channel.assertQueue(process.env.FALLBACK_QUEUE, {
            durable: true
        });

        channel.prefetch(1);

        console.log("Waiting for messages in %s", process.env.QUEUE);
        console.log("Waiting for messages in %s", process.env.FALLBACK_QUEUE);


        channel.consume(process.env.QUEUE, function (msg) {

            console.log("Received '%s'", msg.content.toString());
            mailController.sendMail(JSON.parse(msg.content.toString()));
            setTimeout(function () {
                channel.ack(msg);
            }, 1000);
        });


        channel.consume(process.env.FALLBACK_QUEUE, function (msg) {

            console.log("Received '%s'", msg.content.toString());

            setTimeout(function () {
                channel.ack(msg);
            }, 1000);
        });
    // });
}

// });