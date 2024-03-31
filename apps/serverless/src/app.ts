import { Hono } from 'hono'

const app = new Hono()

app.get('/', (c) => {
  return c.text('Hello Hono!')
})

app.get('/users', (c) =>{
  return c.json({id:1})
})
export default app
