import sequelize from '../config/connection.js'
import { UserFactory } from './User.js';

const User = UserFactory(sequelize);

export { User };
