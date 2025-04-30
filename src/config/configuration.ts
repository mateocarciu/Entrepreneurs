export default () => ({
  port: parseInt('3000'),
  database: {
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT || '3306'),
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    name: process.env.DB_NAME,
  },
  jwt: {
    secret: process.env.JWT_SECRET,
    expiresIn: process.env.JWT_EXPIRES,
  },
  cors: {
    origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  },
  rateLimit: {
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: process.env.RATE_LIMIT_MAX
      ? parseInt(process.env.RATE_LIMIT_MAX)
      : 100,
  },
});
