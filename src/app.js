import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';

import userRoutes from './api/user/route'

const app = express();


app.use(bodyParser.json());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type Authorization');
    next();
})

app.use('/user', userRoutes)

app.use((error, req, res, next) => {
    console.log(error);
    const status = error.statusCode || 500;
    const message = error.message;
    const data = error.data;
    res.status(status).json({ message: message, data: data });
})

mongoose.connect(
    'mongodb://localhost:27017/gibot-saurabh',
    {
        useUnifiedTopology: true,
        useNewUrlParser: true
    }
).then(result => {
    app.listen(7000, () => {
        console.log(`Port: 7000`)
    })
}).catch(err => console.log(err))