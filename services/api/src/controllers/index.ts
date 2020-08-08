import { Router } from 'express'
import ping from 'src/controllers/ping'
import getUser from 'src/controllers/getUser'
import getUsers from 'src/controllers/getUsers'
import postUser from 'src/controllers/postUser'
import deleteUser from 'src/controllers/deleteUser'
import putUser from 'src/controllers/putUser'

const router = Router({
    caseSensitive: true,
    strict: true
})

router.get('/ping', ping)
router.get('/users', getUsers)
router.get('/users/:id', getUser)
router.post("/users", postUser)
router.delete('/users/:id', deleteUser)
router.put('/users/:id', putUser)
export default router