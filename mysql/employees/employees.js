import connection from "../db/db.js";

export async function list(req, res) {
  try {
    const sql = "SELECT * FROM `employees` LIMIT 10";

    const [rows, fields] = await connection.query(sql);

    res.json(rows);
  } catch (err) {
    console.log(err);
    res.status(500).send(`Error when fetching employees ${err}`);
  }
}

export async function create(req, res) {
 const { birth_date, first_name, last_name, gender, hire_date } = req.body;
 if(!birth_date || !first_name || !last_name || !gender || !hire_date){
  res.status(400).send("All fields must be provided: birth_date, first_name, last_name, gender, hire_date");
 }
 try{
  const sql = 'INSERT INTO `employees`(`emp_no`, `birth_date`, `first_name`, `last_name`, `gender`, `hire_date` ) VALUES (?, ?, ?, ?, ?, ?)';
  // uuid would be better | db takes int
  const emp_no = Math.floor(Math.random() * 100) + 1;
  const values = [emp_no, '1980-01-01', 'Axl', 'Rose', 'M', '2024-01-25']
  const [rows, fields] = await connection.execute(sql, values);
  res.json(rows);
 } catch(err){
  console.log(err);
    res.status(500).send(`Error when posting employee ${err}`);
 }
};

export async function read(req, res) {
  const { id } = req.params;
  if (!id) {
    res.status(400).send("Missing URL parameter: employeeId");
  }
  try {
    const sql = "SELECT * FROM `employees` WHERE emp_no = ?";
    const [rows, fields] = await connection.query(sql, [id]);

    res.json(rows);
  } catch (err) {
    console.log(err);
    res.status(500).send(`Error when fetching employee ${err}`);
  }
}
