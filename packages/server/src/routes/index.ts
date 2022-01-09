import * as express from 'express'

const router = express.Router()

router.get('/', function (req, res, next) {
    res.send('Hello Boy!!')
})

module.exports = router