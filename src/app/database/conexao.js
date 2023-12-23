import mysql from 'mysql2';

const connection = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'Derick160315',
  database: 'Despertador'
});

export default connection;
