require('dotenv').config();

module.exports = {
  // development: {
  //   url: process.env.DEV_DATABASE_URL,
  //   dialect: 'postgres',
  //   operatorsAliases: false
  // },
  development: {
    use_env_variable: 'production',
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
    host: process.env.DATABASE_HOST,
    dialect: process.env.DATABASE_DIALECT,
    idleTimeoutMillis: 30000,
  },
  test: {
    url: process.env.TEST_DATABASE_URL,
    dialect: 'postgres',
    operatorsAliases: false,
    logging: false
  },
  production: {
    use_env_variable: "DATABASE_URL",
    url: process.env.DATABASE_URL,
    dialect: 'postgres',
    operatorsAliases: 0,
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    },
    // use_env_variable: 'production',
    // url: process.env.DATABASE_URL,
    // dialectOptions: {
    //   ssl: {
    //     require: true,
    //     rejectUnauthorized: false,
    //   },
    // },
  }
};