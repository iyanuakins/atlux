const express = require('express');
const app = express();
const fs = require('fs');
const path = require('path');
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
    if (req.headers.authorization) {
        let token = req.headers.authorization.split(' ')[1];
        if (token === 'null') {
            return res.status(401).json({error: 'Unauthorized Request'});
        } else {
            jwt.verify(token, secKey, (err, decoded) => {
                if (err) {
                    return res.status(401).json({error: 'Unauthorized Request'});
                } else {
                    req.userId = decoded.subject;
                    next();
                }
            })
        }
        
    } else {
        return res.status(401).json({error: 'Unauthorized Request'});
    }
}

app.use(cors());

app.use(bodyParser.json());

mongoose.connect('mongodb://localhost:27017/atlux', {useNewUrlParser: true})
    .catch((err) => {
        console.log(err);
    })
mongoose.set('useFindAndModify', false);
const connection = mongoose.connection;


connection.once('open', () => console.log('Connected to MongoDB....'));

const clientPath = path.join(__dirname, "./", "frontend/dist/frontend");

if (fs.existsSync(clientPath)) {
    app.use(express.static(clientPath));
    app.get('/', (req, res) => {
        res.send(path.join(clientPath, "index.html"))
    });
}



app.use('/auth', authRoutes);
app.use('/home', homeRoutes);
app.use('/user', verifyToken, userRoutes);
app.use('/admin', verifyToken, adminRoutes);

app.listen(PORT, (req, res) => {
    console.log(`Server listening on port ${PORT}...`)
});