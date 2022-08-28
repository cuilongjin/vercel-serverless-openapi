const dotenv = await import('dotenv')
dotenv.default.config()

const app = (await import('./api/index.js')).default
const port = 3001

app.listen(port, () => {
  console.log(`app listening on port ${port}`)
})
