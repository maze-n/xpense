import express from 'express';
import cors from 'cors';
import appRouter from './routes/index.js';
import { initializeDB } from './db/index.js';

process.env.NODE_TLS_REJECT_UNAUTHORIZED = 0;
const PORT = 8000;
const app = express();
app.use(cors());
app.use(express.json());

app.use(appRouter);

initializeDB().then(() => {
    app.listen(PORT, function (err) {
        if (err) {
            console.log("Failed to start the server!");
            console.error(err);
            return;
        }

        console.log("Server running on Port:", PORT);
    })
}).catch((err) => {
    console.log("Failed to connect with the database!");
    console.error(err);
})
