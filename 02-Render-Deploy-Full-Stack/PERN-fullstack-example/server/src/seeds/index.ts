import { seedUsers } from '../seeds/user-seeds';
import { seedReviews } from '../seeds/review-seeds';
import sequelize from '../config/connection.js';

const seedAll = async (): Promise<void> => {
  try {
    await sequelize.sync({ force: true });
    console.log('\n----- DATABASE SYNCED -----\n');
    
    await seedUsers();  // Seeds users
    console.log('\n----- USERS SEEDED -----\n');
    
    await seedReviews();  // Seeds reviews (after users are seeded)
    console.log('\n----- REVIEWS SEEDED -----\n');
    
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedAll();