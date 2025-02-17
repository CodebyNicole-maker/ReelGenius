import dotenv from 'dotenv';
dotenv.config();

import { Sequelize } from 'sequelize';

// Check if DB_URL exists
const sequelize = process.env.DB_URL
  ? new Sequelize(process.env.DB_URL)
  : new Sequelize(
      process.env.DB_NAME || '', 
      process.env.DB_USER || '', 
      process.env.DB_PASSWORD || '',  
      {
        host: 'localhost',
        dialect: 'postgres',
        dialectOptions: {
          decimalNumbers: true,
        },
        logging: false, 
      }
    );

    sequelize.authenticate()
    .then(() => {
      console.log('Connection has been established successfully.');
    })
    .catch((error: any) => {
      console.error('Unable to connect to the database:', error);
    });
  
export default sequelize;
