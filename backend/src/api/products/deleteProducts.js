import _ from 'lodash'
import { Products } from './../../db'

async function deleteProductsById(req, res) {
    try {
        const id = _.get(req, ['params', 'id'], '')
        const result = await Products.deleteOne({ id }).exec()
        const count = _.get(result, 'deletedCount', 0)

        if (count === 1) {
            res.status(200).json({
                success: true,
            })
        } else {
            res.status(200).json({
                success: false,
                message: 'id not found'
            })
        }
    } catch (e) {
        console.log(e)
        return res.status(400).json({
            success: false
        })
    }
}


export {
    deleteProductsById
}