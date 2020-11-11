import _ from 'lodash'
import { async } from 'regenerator-runtime'
import { Users, Products } from './db'
import axios from 'axios'

export async function init() {
    try {
        const products = await Products.find({}).exec()
        if (products.length == 0) {
            for (let i = 1; i <= 100; i++) {
                products.push({
                    id: i,
                    name: `product${i}`,
                    description: `description for product${i}`,
                    price: i
                })
            }
            await Products.insertMany(products)
        }

        // init user
        const users = await Users.find({}).exec()
        if (users.length == 0) {
            const user = new Users;
            user.username = 'username'
            user.password = 'password'
            user.email = 'test@mail.com'
            user.firstName = 'test'
            user.lastName = 'test'
            user.save()
        }
    } catch (e) {
        console.log(e)
        return
    }
}