// import dotenv library and load config
import dotenv from 'dotenv';
dotenv.config();

// require express application framework
import express from 'express';
const app = express();

app.use(express.static('dist'));

// create http server
import * as http from 'http';
const server = http.createServer(app);

server.listen(process.env.PORT, () => console.log(`server start: ${process.env.PORT}!`));