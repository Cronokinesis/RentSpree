import _ from 'lodash'
import { Products } from './../../db'

async function getProducts(req, res) {
    try {
        res.status(200).json({
            success: true,
            products: await Products.find({}).exec()
        })
    } catch (e) {
        console.log(e)
        return res.status(400).json({
            success: false,
            code: 400
        })
    }
}

async function getProductsById(req, res) {
    try {
        const id = _.get(req, ['params', 'id'], '')
        const product = await Products.findOne({ id }).exec()

        res.status(200).json({
            success: true,
            code: 200,
            product: _.isEmpty(product) ? {} : product
        })
    } catch (e) {
        console.log(e)
        return res.status(400).json({
            success: false,
            code: 400
        })
    }
}


export {
    getProducts,
    getProductsById
}