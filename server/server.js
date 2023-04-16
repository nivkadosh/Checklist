const dotenv = require('dotenv');
const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const todo = require('./routes/todo');

dotenv.config();
const app = express();

app.use(cors({ origin: true, credentials: true }));
app.use(express.json({ extended: false }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/api/todo', todo);

const PORT = process.env.port || 8000;

app.listen(PORT, () => {
  console.log(`Server on running port ${PORT} `);
});

const db = process.env.MONGO_URL;
const connectDB = async () => {
  try {
    await mongoose.connect(db, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDb is connected');
  } catch (err) {
    console.log(err.message);
    process.exit(1);
  }
};
connectDB();
