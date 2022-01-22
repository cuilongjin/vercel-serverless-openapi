async function config (request) {
  const { action } = request.query

  try {
    return await ((await import(`./${action}`)).default)(request)
  } catch (error) {
    return { code: 404, error }
  }
}

export default config
