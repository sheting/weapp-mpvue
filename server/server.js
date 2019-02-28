import Koa from 'koa'
import KoaRouter from 'koa-router'
import koaBody from 'koa-bodyparser'
import {graphqlKoa, graphiqlKoa} from 'graphql-server-koa'
import schema from './schema'

const app = new Koa()
const PORT = 3000
app.use(koaBody())
const router = new KoaRouter()
// koaBody is needed just for POST.
router.post('/graphql', koaBody(), graphqlKoa({ schema }))
// router.get('/graphql', graphqlKoa({ schema: schema }))
router.get('/graphiql', graphiqlKoa({ endpointURL: '/graphql' }))
app.use(router.routes())
app.use(router.allowedMethods())
app.listen(PORT)
