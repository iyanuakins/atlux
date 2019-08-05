const express = require('express');
const app = express();
const fs = require('fs');
const PORT = process.env.PORT || 4000;
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const authRoutes = require('./routes/auth');
const adminRoutes = require('./routes/admin');
const userRoutes = require('./routes/user');
const homeRoutes = require('./routes/home');
const jwt = require('jsonwebtoken');
const secKey = "03SecretKey04";


const verifyToken = (req, res, next) => {
    if (!req.headers.authorization) {
        return res.status(401).json({error: 'Unauthorized Request'});
    }
    let token = req.headers.authorization.split(' ')[1];
    if (token === 'null') {
        return res.status(401).json({error: 'Unauthorized Request'});
    }
    let payload = jwt.verify(token, secKey)
    if (!payload) {
        return res.status(401).json({error: 'Unauthorized Request'});
    }
    req.userId = payload.subject;
    next();
}

app.use(cors());

app.use(bodyParser.json());

mongoose.connect('mongodb://localhost:27017/atlux', {useNewUrlParser: true}).catch((err) => {
    console.log('Error: '+ err);
})
mongoose.set('useFindAndModify', false);
const connection = mongoose.connection;


connection.once('open', () => console.log('Connected to MongoDB....'))

app.get('', (req, res) => {
    res.send("Hello World");
});


app.use('/auth', authRoutes);
app.use('/home', homeRoutes);
app.use('/user', verifyToken, userRoutes);
app.use('/admin', verifyToken, adminRoutes);

app.listen(PORT, (req, res) => {
    console.log(`Server listening on port ${PORT}...`)
});