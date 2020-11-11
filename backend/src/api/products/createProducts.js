import _ from 'lodash'
import { Products } from './../../db'

async function createProducts(req, res) {
    try {
        const {
            id,
            name,
            description,
            price
        } = _.get(req, 'body', {})

        if (_.some([
            !_.isString(id),
            !_.isString(name),
            !_.isString(description),
            _.isNaN(price) || _.isEmpty(price)
        ], (i) => i)) {
            return res.status(400).json({
                success: false,
                code: 400,
                message: 'parameters not found'
            })
        }

        const result = await Products.findOne({ id }).exec()
        if (!_.isEmpty(result)) {
            return res.status(200).json({
                success: false,
                code: 99,
                message: 'id is already exists'
            })
        }

        const product = new Products;
        product.id = id
        product.name = name
        product.description = description
        product.price = Number.parseFloat(price).toFixed(2)
        product.save()

        res.status(201).json({
            success: true,
            code: 201
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
    createProducts
}