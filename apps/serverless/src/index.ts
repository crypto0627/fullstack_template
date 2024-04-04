import { Hono } from 'hono'
import { cors } from 'hono/cors'

type Bindings = {
  serverless: d1_databases
}

const app = new Hono<{ Bindings: Bindings }>()

app.get('/', (c) => {
  return c.text('Hello Hono!')
})

export default app
