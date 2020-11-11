import _ from 'lodash'

export async function getProfile(req, res) {
    try {
        const profile = _.get(req, 'headers.profile', -1)

        return res.status(200).json({
            type: 'success',
            profile
        })
    } catch (e) {
        return res.status(500).json({
            type: 'failure',
        })
    }
}