import got from 'got'
module.exports = async (request, response) => {
  response.status(200).json({ a: 1 })
}
