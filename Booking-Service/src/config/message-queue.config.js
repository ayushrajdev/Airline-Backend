const amqplib = require('amqplib');

let channel, connection;
async function connectMessageQueue() {
    const connection = await amqplib.connect('amqp://localhost');
    const channel = await connection.createChannel(); //channel is lightweight connection that share a single tcp connection with multiple services

    await channel.assertQueue('notification-queue'); // check if this queue is already present in the server or not if not the creates a queue
    // setInterval( () => {
    //     channel.sendToQueue(
    //         'notification-queue',
    //         Buffer.from('hello from the message queue'),
    //     );
    // }, 1000);
}

async function publishMessage(data) {
    try {
        channel.sendToQueue(queue, Buffer.from(JSON.stringify(data)));
    } catch (error) {}
}

connectMessageQueue();

module.exports = { publishMessage, connectMessageQueue };
