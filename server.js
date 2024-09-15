const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const db = require('mongoose');
const port = process.env.PORT || 3000;
const url = process.env.MONGODB_URI;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static('pages'));
db.connect(url).then(() => console.log('db on'));


app.get('/signup', (req, res) => {
    res.sendFile(__dirname + '/pages/signUp.html');
})

app.get('/productsPage', (req, res) => {
    res.sendFile(__dirname + '/pages/productsPage.html')
})

app.get('/buy', (req, res) => {
    res.sendFile(__dirname + '/pages/purchase.html')
})

//get request for showing all pending orders
app.get('/all', (req, res) => {
    if (req.query.admin == 'true') {
        res.sendFile(__dirname + '/pages/allOrders.html')
    } else {
        res.status(400).send('You are not the admin!');//an error status and message
    }
})

//creating scehme template for every user in the database
const userSchema = new db.Schema({
    userName: String,
    email: String,
    password: String
})

const userList = db.model('users', userSchema);

//creating scehme template for every product in the database
const productSchema = new db.Schema({
    productName: String,
    price: Number
})

const productList = db.model('products', productSchema);

//creation of products array
// let productsArr = [
//     { productName: 'kipa', price: 10 },
//     { productName: 'mezuzah', price: 120 },
//     { productName: 'zizit', price: 25 },
//     { productName: 'tefillin', price: 40 },
//     { productName: 'talit', price: 20 },
//     { productName: 'menorah', price: 200 },
//     { productName: 'candles', price: 40 },
//     { productName: 'shofar', price: 500 },
//     { productName: 'sukkah', price: 1000 },
//     { productName: 'bible', price: 150 },
// ]

//applying the products to the database
// const insertProducts = async () => {
//     await productList.insertMany(productsArr);
// }
// insertProducts();


// creating scehme template for every pending order item in the database
const pendingSchema = new db.Schema({
    buyerName: String,
    listOfProducts: Array
})

const pendingList = db.model('pendings', pendingSchema);


//checking if a specific user exists in the database
app.post('/signIn', async (req, res) => {
    let result = await userList.findOne({ email: req.body.email, password: req.body.password });
    res.json(result);
})

//get request for finding the products array
app.get('/products', async (req, res) => {
    let result = await productList.find();
    res.json(result);
})

//creating a new user in the database
app.post('/detailForm', async (req, res) => {
    let user = {
        userName: req.body.userName,
        email: req.body.userEmail,
        password: req.body.userPassword
    };

    let result = await userList.findOne({ email: req.body.email });
    if (result != null) {
        alert('Email already exists. Please try again');
    } else {
        await userList.insertMany(user);
        res.sendFile(__dirname + '/pages/index.html');
    }
})

//entering pending orders to the database
app.post('/purchase', async (req, res) => {
    let userNameData = await userList.findOne({ email: req.body.userEmailData });

    let pendingOrder = {
        buyerName: userNameData.userName,
        listOfProducts: req.body.prodArrData
    }

    await pendingList.insertMany(pendingOrder);
    res.send('Your order is ready');
})

//finding all pending orders in the database
app.get('/allPending', async (req, res) => {
    let result = await pendingList.find();
    res.json(result);
})

app.listen(port, () => console.log(`server works on port ${port}`));