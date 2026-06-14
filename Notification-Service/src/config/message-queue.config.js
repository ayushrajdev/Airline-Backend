const amqplib = require('amqplib');
const EmailService = require('../services/email.service');
const queue = 'notification-queue';

let connection;
let channel;
async function connectMessageQueue() {
    const connection = await amqplib.connect('amqp://localhost');
    const channel = await connection.createChannel(); //channel is lightweight connection that share a single tcp connection with multiple services

    await channel.assertQueue(queue); // check if this queue is already present in the server or not if not the creates a queue

    // await channel.consume(queue, (data) => {
    //     console.log(Buffer.from(data.content.toString()));
    //     channel.ack(data)
    // });
}


async function consumeMessage() { 
    try {
        await channel.consume(queue, async (data) => {
            data = Buffer.from(data.content).toString();
            const { recepientEmail, subject, text } = JSON.parse(data);
            await EmailService.sendMail({ subject, text, to: recepientEmail });
            channel.ack(data);
        });
    } catch (error) {
        console.log(error);
    }
}

module.exports = { connectMessageQueue, consumeMessage };
