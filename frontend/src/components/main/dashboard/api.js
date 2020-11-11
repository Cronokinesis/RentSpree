import axios from 'axios'
import _ from 'lodash'

const getProductsWithAPI = async () => {
    try {
        const response = await axios({
            method: 'GET',
            url: '/products',
        })
        const success = _.get(response, ['data', 'success'], false)
        const products = _.get(response, ['data', 'products'], [])

        if (success) {
            return products
        }
        return []
    } catch (e) {
        console.log(e)
        return []
    }
}

const createProduct = async ({ id, name, description, price }) => {
    try {
        const response = await axios({
            method: 'POST',
            url: '/products',
            data: { id, name, description, price }
        })

        return {
            success: _.get(response, ['data', 'success'], false),
            code: _.get(response, ['data', 'code'], 0),
            message: _.get(response, ['data', 'message'], ''),
        }
    } catch (e) {
        console.log(e)
        return false
    }
}

const updateProductById = async ({ id, name, description, price }) => {
    try {
        const response = await axios({
            method: 'PUT',
            url: '/products',
            data: { id, name, description, price }
        })

        return _.get(response, ['data', 'success'], false)
    } catch (e) {
        console.log(e)
        return false
    }
}

const deleteProductById = async (id) => {
    try {
        const response = await axios({
            method: 'DELETE',
            url: `/products/${id}`,
        })

        return _.get(response, ['data', 'success'], false)
    } catch (e) {
        console.log(e)
        return false
    }
}

export { getProductsWithAPI, createProduct, updateProductById, deleteProductById }