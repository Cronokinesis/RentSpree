import _ from 'lodash'
import { Users } from '../../db'
import moment from 'moment'

export async function createAccount(req, res) {
    try {
        const {
            username,
            password,
            email,
            firstname,
            lastname
        } = _.get(req, 'body', {})

        const users = await Users.find({ username }).exec()

        if (users.length == 0) {

            const user = new Users;
            user.username = username
            user.password = password
            user.email = email
            user.firstname = firstname
            user.lastname = lastname
            await user.save()

            return res.status(201).json({
                type: 'success'
            })
        }

        return res.status(200).json({
            type: 'failure',
            errMessage: "username is already exists"
        })
    } catch (e) {
        return res.status(500).json({
            type: 'failure',
        })
    }
}