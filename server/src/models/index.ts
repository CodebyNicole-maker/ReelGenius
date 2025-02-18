import sequelize from '../config/connection.js';
import { UserFactory } from './User.js'; //todo Import User factory function
import { ReviewFactory } from './review_table.js'; //todo Import Review factory function

//todo Create User and Review models by passing the sequelize instance
const User = UserFactory(sequelize);
const Review = ReviewFactory(sequelize);

//todo Function to define associations between models
export function defineAssociations() {
  //todo Each review belongs to a single user
  Review.belongsTo(User, { foreignKey: 'userId', as: 'user' });

  //todo A user can have multiple reviews
  User.hasMany(Review, { foreignKey: 'userId', as: 'reviews' });

  console.log('Associations defined successfully.');
}

//todo Export models for use in other parts of the application
export { User, Review };
