import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config(); //todo Load environment variables


console.log('Connecting to database:', process.env.DB_NAME || 'NOT SET');
console.log('Using user:', process.env.DB_USER || 'NOT SET');


const sequelize = new Sequelize(
  process.env.DB_NAME || 'reelgenius_db',  
  process.env.DB_USER || 'postgres', 
  process.env.DB_PASSWORD,  
  {
    host: 'localhost',
    dialect: 'postgres',
    dialectOptions: {
      decimalNumbers: true,
    },
    logging: false,
  }
);

//todo Check database connection
sequelize.authenticate()
  .then(() => {
    console.log('Connection to reelgenius_db established successfully.');
  })
  .catch((error) => {
    console.error('Unable to connect to the database:', error);
  });

export default sequelize;
