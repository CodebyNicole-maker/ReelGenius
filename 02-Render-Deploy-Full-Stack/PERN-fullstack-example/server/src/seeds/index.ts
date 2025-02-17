import { seedUsers } from '../seeds/user-seeds.js';
import { seedReviews } from '../seeds/review-seeds.js';
import sequelize from '../config/connection.js';
//todo Function to seed all data into the database
const seedAll = async (): Promise<void> => {
  //todo Syncs the database: force: true drops existing tables and recreates them
  try {
    await sequelize.sync({ force: true });
    console.log('\n----- DATABASE SYNCED -----\n');
    
    await seedUsers();  //todo Seeds users
    console.log('\n----- USERS SEEDED -----\n');
    
    await seedReviews();  //todo Seeds reviews (after users are seeded)
    console.log('\n----- REVIEWS SEEDED -----\n');
    
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
    //todo Log any errors that occur during seeding
  }
};
    
seedAll();