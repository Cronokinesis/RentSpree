import mongoose from 'mongoose';
import { async } from 'regenerator-runtime';
import { SchemaProducts } from './products'
import { SchemaUsers } from './users'

export async function isMongodbConnection() {
    try {
        await mongoose.connect(
            `mongodb://${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_DATABASE}`,
            { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true }
        )
        return true
    } catch (e) {
        console.log(e)
        return false
    }
}

export const Users = mongoose.model('users', SchemaUsers, 'users')
export const Products = mongoose.model('products', SchemaProducts, 'products')