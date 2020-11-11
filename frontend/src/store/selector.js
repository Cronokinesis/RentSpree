import _ from 'lodash'
import { selector } from 'recoil'
import {
    characterState,
    productsState,
    listOptionState,
    selectItemState
} from './atom'

export const getLastName = selector({
    key: 'getFirstName',
    get: ({ get }) => {
        const fullName = get(characterState)
        const lastName = _.get(fullName, 'lastName', '')
        return _.isEmpty(lastName) ? 'Norris' : lastName
    }
})

export const getFirstName = selector({
    key: 'getLastName',
    get: ({ get }) => {
        const fullName = get(characterState)
        const firstName = _.get(fullName, 'firstName', '')
        return _.isEmpty(firstName) ? 'Chuck' : firstName
    }
})

export const getProducts = selector({
    key: 'getProducts',
    get: ({ get }) => {
        const products = get(productsState);
        const listOption = get(listOptionState);
        const countProducts = products.length
        const limit = _.get(listOption, 'limit', 0)
        const numberOfPage = _.get(listOption, 'numberOfPage', 1)
        const start = (numberOfPage - 1) * limit
        const end = numberOfPage * limit
        const splitProducts = limit <= 0 ? products : _.slice(products, start, end)
        const maxPages = limit <= 0 ? 1 : Math.floor(countProducts / limit) + ((countProducts % limit) === 0 ? 0 : 1)

        return {
            products: splitProducts,
            pages: maxPages,
            limit,
            numberOfPage,
            totalProducts: countProducts,
        }
    }
});

export const getPagination = selector({
    key: 'getPagination',
    get: ({ get }) => {
        const products = get(productsState);
        const listOption = get(listOptionState);
        const countProducts = products.length
        const limit = _.get(listOption, 'limit', 0)
        const numberOfPage = _.get(listOption, 'numberOfPage', 1)
        const maxPages = limit <= 0 ? 1 : Math.floor(countProducts / limit) + ((countProducts % limit) === 0 ? 0 : 1)

        const difStart = numberOfPage - 1
        const difEnd = maxPages - numberOfPage

        let pagination = [{
            no: 0,
            active: false,
            enable: difStart !== 0,
            symbol: '<'
        }, {
            no: maxPages + 1,
            active: false,
            enable: difEnd !== 0,
            symbol: '>'
        }]

        if (maxPages < 5) {
            for (let i = 1; i <= maxPages; i++) {
                pagination.push({
                    no: i,
                    active: i === numberOfPage ? true : false,
                    enable: true,
                    symbol: i
                })
            }
        } else {
            if (difStart < 3) {
                for (let i = 1; i <= (maxPages > 5 ? 5 : maxPages); i++) {
                    pagination.push({
                        no: i,
                        active: i === numberOfPage ? true : false,
                        enable: true,
                        symbol: i
                    })
                }
            } else if (difEnd < 2) {
                for (let i = maxPages; i > maxPages - 5; i--) {
                    pagination.push({
                        no: i,
                        active: i === numberOfPage ? true : false,
                        enable: true,
                        symbol: i
                    })
                }
            } else {
                for (let i = numberOfPage - 2; i <= numberOfPage + 2; i++) {
                    pagination.push({
                        no: i,
                        active: i === numberOfPage ? true : false,
                        enable: true,
                        symbol: i
                    })
                }
            }
        }

        pagination.sort((a, b) => a.no - b.no)

        return pagination
    }
})

export const getLimits = selector({
    key: 'getLimits',
    get: ({ get }) => {
        return [1, 5, 10, 20, 50, 100]
    }
})

export const getItemFromSelector = selector({
    key: 'getItemFromSelector',
    get: ({ get }) => {
        return get(selectItemState)
    },
    set: ({ set, get, reset }) => {
        reset(selectItemState)
    }
})