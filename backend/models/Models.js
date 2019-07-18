const Users = require('./userModel');
const Cars = require('./carModel');
const Orders = require('./orderModel');
const Reviews = require('./reviewModel');
const Carts = require('./cartModel');
const Brands = require('./brandModel');
const Types = require('./typeModel');

const Models = {
    Users,
    Cars,
    Orders,
    Reviews,
    Carts,
    Brands,
    CarTypes
}

module.exports = Models;