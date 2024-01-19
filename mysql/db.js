import mysql from 'mysql2/promise';
import '../env.js';

export async function dbConnection(){
    let connection;
    try {
        connection = await mysql.createConnection({
          host: process.env.DB_HOST,
          user: process.env.DB_USER,
          database: process.env.DB_DATABASE
          
        });
      } catch (err) {
        console.log(err);
      }
      
      if(!connection) {
          console.log('Error connecting to DB');
      } else {
          console.log('DB connected');
      }
      return connection;
        
}

