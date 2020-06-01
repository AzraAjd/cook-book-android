require('dotenv').config({ path: require('find-config')('.env') })

module.exports = {
  test: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.HOST,
    dialect: 'mysql'
  }
}

