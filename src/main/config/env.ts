export default {
  mongoUrl: process.env.MONGO_URL || 'mongodb://mongodb:27017/clean-typescript-api',
  port: process.env.PORT || 5031,
  jwtSecret: process.env.SECRET || 'secret'
}
