// Credentials for jwt Secret and Database
module.exports = {
    MONGO_URI: process.env.DATABASE_INFO || 'mongodb://localhost:27017',
    jwtSecret: process.env.JWT_SECRET || 'my_secret_code'
}