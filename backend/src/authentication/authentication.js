import _ from 'lodash'
import { verifyToken } from './token'

export async function middleware(req, res, next) {
    try {
        const bearer = _.get(req, 'headers.authorization', '')
        if (!_.isEmpty(bearer) && bearer.indexOf('Bearer ') > -1) {
            const token = bearer.split(' ')[1]

            if (!_.isEmpty(token)) {
                const { success, profile } = verifyToken(token)
                if (success) {
                    req.headers.profile = profile
                    next();
                } else {
                    return res.status(401).send("unauthentication")
                }
            } else {
                return res.status(401).send("unauthentication")
            }
        } else {
            return res.status(401).send("unauthentication")
        }
    } catch (e) {
        console.log(e)
        return res.status(403).send('unauthentication')
    }
};
