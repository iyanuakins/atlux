const Users = require('./user');
const Cars = require('./car');
const Orders = require('./order');
const Reviews = require('./review');
const Carts = require('./cart');
const Brands = require('./brand');
const Types = require('./type');

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