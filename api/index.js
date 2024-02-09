const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();
const User = require('./models/User');
const app = express();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Place = require('./models/Place')
const imageDownloader = require('image-downloader');
var cookieParser = require('cookie-parser');
const Booking = require('./models/Booking')
const fs = require('fs');
const multer = require('multer')

const salt = bcrypt.genSaltSync(10);
const secret = "ejfsdjfkajsdflkaj";

app.use(cookieParser());
app.use('/uploads', express.static(__dirname + '/uploads'))
app.use(express.json());
app.use(cors({
    credentials: true,
    origin: 'http://127.0.0.1:5000'
}));

mongoose.connect(process.env.MONGO_URL);

function getUserDataFromReq(req) {
    return new Promise((resolve, reject) => {
        jwt.verify(req.cookies.token, secret, {}, async (err, userData) => {
            if (err) throw (err);
            resolve(userData);
        })
    })
}

app.get('/test', (req, res) => {
    res.json("fine");
})

app.post('/register', async (req, res) => {
    const { name, email, password } = req.body;
    const userDoc = await User.create({
        name,
        email,
        password: bcrypt.hashSync(password, salt),
    })
    res.json(userDoc);
    // res.json(req.cookie);
})

app.post('/login', async (req, res) => {
    const { email, password } = req.body
    const userDoc = await User.findOne({ email });
    if (!userDoc) {
        return res
            .status(400)
            .json({ error: "please login with correct credentials" });
    }
    const passOk = bcrypt.compareSync(password, userDoc.password);
    if (!passOk) {
        return res
            .status(400)
            .json({ error: "please login with correct credentials" });
    }
    jwt.sign({ email: userDoc.email, id: userDoc._id, name: userDoc.name }, secret, {}, (err, token) => {
        if (err) throw err;
        res.cookie('token', token).json(userDoc)
    })
})

app.get('/profile', (req, res) => {
    const { token } = req.cookies;
    if (token) {
        jwt.verify(token, secret, {}, async (err, userData) => {
            if (err) throw err;
            const userDoc = await User.findById(userData.id);
            res.json(userDoc);
        })
    } else {
        res.json(null);
    }
    // res.json({ token })
    // res.json("profile")
})

app.post('/logout', (req, res) => {
    res.cookie('token', '').json(true);
})


app.post('/upload-by-link', async (req, res) => {
    const { link } = req.body;
    const newName = 'photo' + Date.now() + '.jpg';
    await imageDownloader.image({
        url: link,
        dest: __dirname + '/uploads/' + newName,
    })
    res.json(__dirname + '/uploads/' + newName)
});

// const photosMiddleware = multer({ dest: '/uploads' })
// app.post('/upload', photosMiddleware.array('photos', 100), async (req, res) => {
//     const uploadedFiles = [];
//     for (let i = 0; i < req.files.length; i++) {
//         const { path, originalname } = req.files[i];
//         const parts = originalname.split('.');
//         const ext = parts[parts.length - 1];
//         const newPath = path + '.' + ext;
//         fs.renameSync(path, newPath);
//         uploadedFiles.push(newPath.replace('/uploads/', ''));
//     }
// })

app.post('/places', (req, res) => {
    const { token } = req.cookies;
    const { title, address, photos,
        description, perks, extraInfo,
        checkIn, checkOut, maxGuests, price } = req.body;
    jwt.verify(token, secret, {}, async (err, userData) => {
        if (err) throw err;
        const placeDoc = await Place.create({
            owner: userData.id,
            title, address, photos: photos,
            description, perks, extraInfo,
            checkIn, checkOut, maxGuests, price
        })
    })
})

app.get('/user-places', (req, res) => {
    const { token } = req.cookies;
    jwt.verify(token, secret, {}, async (err, userData) => {
        const { id } = userData;
        res.json(await Place.find({ owner: id }));
    })
})

app.get('/places/:id', async (req, res) => {
    const { id } = req.params;
    res.json(await Place.findById(id));
})

app.put('/places', async (req, res) => {
    const { token } = req.cookies;
    const {
        id, title, address, photos,
        description, perks, extraInfo,
        checkIn, checkOut, maxGuests, price
    } = req.body;
    jwt.verify(token, secret, {}, async (err, userData) => {
        const placeDoc = await Place.findById(id);
        if (userData.id === placeDoc.owner.toString()) {
            placeDoc.set({
                title, address, photos: photos,
                description, perks, extraInfo,
                checkIn, checkOut, maxGuests, price
            });
            await placeDoc.save();
            res.json('fine')
        }
    })
})

app.delete('/places', async (req, res) => {
    const { id } = req.body;
    // console.log(id)
    try {
        await Place.findByIdAndDelete(id);
        return res.status(200).json({ success: true, msg: 'Place Deleted' });
    }
    catch (err) {
        console.error(err);
    }
    res.json('delete successfully')
})

app.get('/places', async (req, res) => {
    res.json(await Place.find());
})

app.get('/place/:id', async (req, res) => {
    const { id } = req.params;
    res.json(await Place.findById(id));
})

app.post('/bookings', async (req, res) => {
    const userData = await getUserDataFromReq(req);
    const { checkIn, checkOut, place,
        numberOfGuests, name, phone, price, user } = req.body;
    await Booking.create({
        place, checkIn, checkOut, numberOfGuests,
        name, phone, price, user
    }).then((doc) => {
        res.json(doc)
    }).catch((err) => {
        throw (err);
    })
})


app.get('/bookings', async (req, res) => {
    const userData = await getUserDataFromReq(req);
    res.json(await Booking.find({ user: userData.id })
        .populate('place'))
})

app.listen(5);

//lawNHzAorCSDLGDz


