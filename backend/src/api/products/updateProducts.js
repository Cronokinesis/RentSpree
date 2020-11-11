import _ from 'lodash'
import { Products, closeMongodb } from './../../db'

async function updateProducts(req, res) {
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
        if (_.isEmpty(result)) {
            return res.status(400).json({
                success: false,
                code: 400,
                message: 'id not found'
            })
        }

        result.name = name
        result.description = description
        result.price = price
        result.updatedAt = new Date()
        result.save()

        res.status(200).json({
            success: true,
            code: 200
        })
    } catch (e) {
        console.log(e)
        return res.status(400).json({
            success: false,
            code: 200
        })
    }
}


export {
    updateProducts
}