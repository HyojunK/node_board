// 환경 변수 설정
const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });

const app = require('./app');

const mongoose = require('mongoose');

// DATABASE 주소 설정 및 연결
const db = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);

mongoose
  .connect(db)
  .then(() => console.log('Database successfully connected!'));

const port = process.env.PORT || 3000;
const server = app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});
