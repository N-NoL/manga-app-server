module.exports = {
  "type": "postgres",
  "host": "34.107.53.238",
  "port": 5432,
  "username": "postgres",
  "password": "2304",
  "database": "manga",
  "entities": ["dist/**/*.entity{.ts,.js}"],
  "subscribers": ["dist/**/*.subscriber{.ts,.js}"],
  "synchronize": true
}