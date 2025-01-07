import { Hono } from "hono";
import { COMPANY } from "./constants/Company";
import { CONTACT } from "./constants/Contact";
import { OVERVIEW } from "./constants/Overview";
import { QUESTION } from "./constants/Question";
import { TERM } from "./constants/Term";

const app = new Hono();

app.get('/term', (c) => {
  return c.json(
    {value: TERM}
  )
})
app.get('/question', (c) => {
  return c.json(
    {value: QUESTION}
  )
})
app.get('/overview', (c) => {
  return c.json(
    {value: OVERVIEW}
  )
})
app.get('/contact', (c) => {
  return c.json(
    {value: CONTACT}
  )
})
app.get('/company', (c) => {
  return c.json(
    {value: COMPANY}
  )
})

export { app as TermApp };