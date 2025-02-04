const express = require('express');
const cors = require('cors');
const readline = require('readline');
const { Sequelize, DataTypes } = require('sequelize');
require('dotenv').config();  // Load environment variables from .env

// Create an Express app
const app = express();
const port = 3000;

app.use(cors());
app.use(express.json())

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Set up Sequelize to connect to MySQL using environment variables
const sequelize = new Sequelize(
  process.env.DB_NAME,       // Database name
  process.env.DB_USER,       // Database user
  process.env.DB_PASSWORD,   // Database password
  {
    host: process.env.DB_HOST,  // Host
    dialect: 'mysql',           // Database type (MySQL)
    logging: false,             // Disable SQL logging
  }
);

// Define the User model
const User = sequelize.define('User', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

// Sync models with the database
async function syncModels() {
  try {
    await sequelize.sync({ force: true }); // Creates the table, dropping it first if it exists
    console.log('User table has been created!');
  } catch (error) {
    console.error('Error syncing models:', error);
  }
}

// Express endpoint to get users
app.post('/validate-login', async (req, res) => {
  try {
    console.log(req.body);
    rl.question("Enter number: 0 or 1: ", async(answer) => {
    const { username, password} = req.body;
    const user = await User.create({username, password});
      console.log(user)
      const result = { answer };
      console.log(result)
      res.json(result);
    });
  } catch (error) {
    res.status(500).send('Error fetching users');
  }
});

// Initialize the app and start the server
async function startApp() {
  await syncModels();

  app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  });
}

startApp();
