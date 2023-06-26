// Credentials for jwt Secret and Database mongodb://admin:Grek0%402017@3.226.26.189:27017/?authMechanism=DEFAULT&authSource=admin || "mongodb://localhost:27017"||
module.exports = {
    MONGO_URI: process.env.DATABASE_INFO || "mongodb://admin:Grek0%402017@3.226.26.189:27017/eta_platform_db?authMechanism=DEFAULT&authSource=admin",
    jwtSecret: process.env.JWT_SECRET || 'my_secret_code'
}