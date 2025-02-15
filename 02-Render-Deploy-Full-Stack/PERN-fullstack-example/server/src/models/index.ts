import sequelize from '../config/connection.js';
import { UserFactory } from './User.js'; // Import User factory
import { ReviewFactory } from './review_table.js'; // Import Review factory

const User = UserFactory(sequelize);
const Review = ReviewFactory(sequelize);

export function defineAssociations() {
  Review.belongsTo(User, { foreignKey: 'userId', as: 'user' });
  User.hasMany(Review, { foreignKey: 'userId', as: 'reviews' });

  console.log('Associations defined successfully.');
}

export { User, Review };
