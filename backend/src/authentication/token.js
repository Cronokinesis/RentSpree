import _ from 'lodash'
import jwt from 'jwt-simple'
import passportJwt from 'passport-jwt'

export function createToken(payload) {
    return jwt.encode(payload, process.env.MY_SECRET_KEY)
}

export function verifyToken(token) {
    var decoded = jwt.decode(token, process.env.MY_SECRET_KEY);
    if (!_.isEmpty(decoded)) {
        return { success: true, profile: decoded }
    }
    return {
        success: false
    }
}