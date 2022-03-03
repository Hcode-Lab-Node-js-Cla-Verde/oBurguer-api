module.exports = {
  "type": "mysql",
  "host": "localhost",
  "port": 3306,
  "username": process.env.DATABASE_USERNAME,
  "password": process.env.DATABASE_PASSWORD,
  "database": "oburguer",
  "syncronize": true,
  "logging": false,
  "entities": [
    "typeorm/entity/**/*.ts"
  ],
  "migrations": [
    "typeorm/migration/**/*.ts"
  ],
  "subscribers": [
    "typeorm/subscriber/**/*.ts"
  ],
  "cli": {
    "entitiesDir": "typeorm/entity",
    "migrationsDir": "typeorm/migration",
    "subscriberDir": "typeorm/subscriber"
  }
};