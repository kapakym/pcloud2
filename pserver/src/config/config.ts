export default () => ({
  // Определение переменной режима
  environment: process.env.NODE_ENV || 'development',
  // Настройки для базы данных
  DATABASE_URL:
    process.env.NODE_ENV === 'production'
      ? 'postgresql://postgres:Pedan1982@postgres:5432/pcloud2db?schema=public'
      : 'postgresql://postgres:Pedan1982@localhost:5432/pcloud2db?schema=public',
  JWT_SECRET: 'dfsfadsfsad',
  JWT_SECRET_SHARE: 'fffffdfadfadsfasdfdsaf',
  PORT: process.env.NODE_ENV === 'production' ? 5554 : 5555,
  STATIC_FOLDER: 'static',
  CLOUD_PATH:
    process.env.NODE_ENV === 'production'
      ? '/var/share'
      : '/Users/alex/cloudTest',
  TEMP_PREFIX: 'temp',
  SERVER_PYTHON:
    process.env.NODE_ENV == 'production'
      ? 'http://pythonface:6000'
      : 'http://localhost:6000',
  DOMAIN: process.env.NODE_ENV === 'production' ? 'server' : 'localhost',
  MAIL_USER: '',
  MAIL_PASSWORD: '',
  MAIL_HOST: '',
  MAIL_PORT: 465,
});
