import { Hono } from 'hono'
import { etag } from 'hono/etag'
import { logger } from 'hono/logger'
import { jwt } from 'hono/jwt'

const app = new Hono()

app.use(etag(), logger())

app.get('/', (c) => {
  return c.text('Hello Hono!')
})

app.use(
  '/auth/*',
  jwt({
    secret: 'it-is-very-secret',
  })
)

app.get('/auth/page', (c) => {
  return c.text('You are authorized')
})

export default app
