const {
  db: { username, password, database, host },
} = require('./index');

module.exports = {
  development: {
    username,
    password,
    database,
    host,
    dialect: 'postgres',
    seederStorage: 'sequelize',
  },
  production: {
    use_env_variable: 'postgres://xibncwzqmsuaky:52e765fa044fab6ce1c916e863c373d42fb5563de2346111b725844921100adf@ec2-3-211-37-117.compute-1.amazonaws.com:5432/d9vrkck4c0a0dj',
    dialect: 'postgres',
    seederStorage: 'sequelize',
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    },
  }
};
