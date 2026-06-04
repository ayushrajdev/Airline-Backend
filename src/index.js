const serverConfig = require('./config/server.config');
console.log(serverConfig)
const connectDb  = require('./config/db.config');
const express = require('express');
const v1Router = require('./routers/v1');
const genericErrorHandler = require('./utils/genericErrorHandler');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.text());

app.use('/api/v1', v1Router);

app.use(genericErrorHandler);

(async () => {
    try {
        await connectDb();

        app.listen(serverConfig.PORT, () => {
            console.log(`Server running on port ${serverConfig.PORT}`);
            console.log('Database connected');
        });
    } catch (error) {
        console.error('Failed to connect to database:', error);
        process.exit(1);
    }
})();