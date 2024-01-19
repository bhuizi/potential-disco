import express from 'express';
import morgan from 'morgan';

import { dbConnection } from './db.js';
import '../env.js';


const connection = await dbConnection();

const app = express();

app.use(morgan('dev'));
app.use(express.json());
app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.get('/employees', async function (req, res) {
    try {
        const sql = 'SELECT * FROM `employees` LIMIT 10';
      
        const [rows, fields] = await connection.query(sql);
      
        res.json(rows);
        

      } catch (err) {
          console.log(err);
        res.status(500).send(`Error when fetching employees ${err}`);
      }
});

app.get('/employees/:id', async function(req, res) {
 const {id} = req.params;
 if(!id) {
     res.status(400).send('Missing URL parameter: employeeId');
 }
 try{
  const sql = 'SELECT * FROM `employees` WHERE emp_no = ?';
    const [rows, fields] = await connection.query(sql, [id]);
      
  res.json(rows);
 } catch(err) {
     console.log(err);
     res.status(500).send(`Error when fetching employee ${err}`);
 }
});

app.use(function(err, req, res, next) {
    console.error(err.stack);
    res.status(500).send('Something broke!');
  }
);


app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
});