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
    uriDB: process.env.URI_DB

  },
  test: {
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST
  },
  production: {
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST
  },
  token: {
    secret: process.env.JWT_PASS,
    expiresIn: process.env.JWT_EXPIRES_IN
  },
  sendGrid: {
    apiKey: process.env.SENDGRID_API_KEY,
    email: process.env.SENDGRID_EMAIL,
    sendEmails: process.env.SENDGRID_SEND_EMAILS === 'true'
  },
  cloudinary: {
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET

  }
}
