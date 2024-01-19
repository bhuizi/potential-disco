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
