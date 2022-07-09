import 'dotenv/config'
export default {
  organizationId: 1,
  adminRoleName: 'admin',
  development: {
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    uriDB: process.env.URI_DB,
  },
  test: {
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    uriDB: process.env.URI_DB_TEST,
  },
  production: {
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
  },
  token: {
    secret: process.env.JWT_PASS,
    expiresIn: process.env.JWT_EXPIRES_IN,
  },
  nodemailer: {
    user: process.env.NODEMAILER_USER,
    pass: process.env.NODEMAILER_PASS,
    port: process.env.NODEMAILER_PORT,
    host: process.env.NODEMAILER_HOST,
  },
  cloudinary: {
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  },
  sentry: {
    dsn: process.env.SENTRY_DSN,
  },
  limitPagination: process.env.LIMIT_PAGINATION,
  nameApp: {
    api: process.env.NAME_API,
    app: process.env.NAME_APP,
  },
  mercadopago: {
    access_token: process.env.MP_ACCESS_TOKEN,
    back_urls: process.env.MP_BACK_URLS,
  },
}
