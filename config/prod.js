const creds = require('../my')

module.exports = {
  'dbURL': `mongodb+srv://${creds}@cluster0.i8g4i.mongodb.net/easylifeDB?retryWrites=true&w=majority`,
}
