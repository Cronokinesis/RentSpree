import _ from 'lodash'
import { Users } from '../../db'
import { createToken } from '../../authentication'

export async function login(req, res) {
    try {
        const { username, password } = _.get(req, 'body', {})
        const response = await Users.find({ username, password }).exec()

        if (response.length == 1) {
            const user = response[0]
            return res.status(200).json({
                type: 'success',
                token: createToken({
                    id: _.get(user, 'id'),
                    email: _.get(user, 'email'),
                    username: _.get(user, 'username'),
                    firstname: _.get(user, 'firstname'),
                    lastname: _.get(user, 'lastname'),
                    createdAt: _.get(user, 'created_at'),
                    updatedAt: _.get(user, 'updated_at')
                })
            })
        }
        return res.status(401).send('unauthentication')
    } catch (e) {
        console.log(e)
        return res.status(500).send('unauthentication')
    }
}