// const express = require("express");
// const bodyParser = require("body-parser");
// const mysql = require("mysql");
// const cors = require("cors");

// const app = express();
// app.use(cors());
// app.use(bodyParser.json());

// // MySQL 연결 설정
// const connection = mysql.createConnection({
//   host: "localhost",
//   user: "yourUsername",
//   password: "yourPassword",
//   database: "yourDatabase",
// });

// connection.connect((err) => {
//   if (err) throw err;
//   console.log("Connected to MySQL Database!");
// });

// // 데이터 가져오기
// app.get("/api/data", (req, res) => {
//   connection.query("SELECT * FROM transactions", (err, results) => {
//     if (err) throw err;
//     res.send(results);
//   });
// });

// // 데이터 추가하기
// app.post("/api/data", (req, res) => {
//   const { date, category, item, notes, income, expense } = req.body;
//   const query =
//     "INSERT INTO transactions (date, category, item, notes, income, expense) VALUES (?, ?, ?, ?, ?, ?)";
//   connection.query(
//     query,
//     [date, category, item, notes, income, expense],
//     (err, result) => {
//       if (err) throw err;
//       res.send({ message: "Data inserted successfully!" });
//     }
//   );
// });

// const PORT = 5000;
// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });
