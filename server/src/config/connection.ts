import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config(); //todo Load environment variables


console.log('Connecting to database:', process.env.DB_NAME);
console.log('Using user:', process.env.DB_USER);


// const sequelize = new Sequelize(
//   process.env.DB_NAME || 'reelgenius_db',  
//   process.env.DB_USER || 'postgres', 
//   process.env.DB_PASSWORD,  
//   {
//     host: 'localhost',
//     dialect: 'postgres',
//     dialectOptions: {
//       decimalNumbers: true,
//     },
//     logging: false,
//   }
// );

let sequelize: Sequelize;

if (process.env.DB_URL) {
  sequelize = new Sequelize(process.env.DB_URL);
} else {
  sequelize = new Sequelize(
    process.env.DB_NAME || 'reelgenius_db',
    process.env.DB_USER || 'postgres',
    process.env.DB_PASSWORD,
    {
      host: 'localhost',
      dialect: 'postgres',
    },
  );
}

//todo Check database connection
sequelize.authenticate()
  .then(() => {
    console.log('Connection to reelgenius_db established successfully.');
  })
  .catch((error) => {
    console.error('Unable to connect to the database:', error);
  });

export default sequelize;
