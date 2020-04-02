const crypto = require('crypto')

module.exports = function crytograph(data) {
  return crypto.createHmac('sha256', 'keys').update(data).digest('hex')
}