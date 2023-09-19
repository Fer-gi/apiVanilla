// import products from '../data/products.json' assert {type:'json'}  
// import products from '../data/products.json' with {type:'json'} 

import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const data = require('../data/products.json');






import { v4 as uuidv4 } from 'uuid';



import utils from '../utils/util.js';

function findAll() {
    return new Promise((resolve, reject) => {
        resolve(products)
    })
}

function findById(id) {
    return new Promise((resolve, reject) => {
        const product = products.find((p) => p.id === id)
        resolve(product)
    })
}

function create(product) {
    return new Promise((resolve, reject) => {
        const newProduct = {id: uuidv4(), ...product}
        products.push(newProduct)
        if (process.env.NODE_ENV !== 'test') {
           utils.writeDataToFile('./data/products.json', products);
        }
        resolve(newProduct)
    })
}

function update(id, product) {
    return new Promise((resolve, reject) => {
        const index = products.findIndex((p) => p.id === id)
        products[index] = {id, ...product}
        if (process.env.NODE_ENV !== 'test') {
            utils.writeDataToFile('./data/products.json', products);
        }
        resolve(products[index])
    })
}

function remove(id) {
    return new Promise((resolve, reject) => {
        products = products.filter((p) => p.id !== id)
        if (process.env.NODE_ENV !== 'test') {
           utils.writeDataToFile('./data/products.json', products);
        }
        resolve()
    })
}

export const productModel = {
    findAll,
    findById,
    create,
    update,
    remove
}