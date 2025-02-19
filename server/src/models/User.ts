import { DataTypes, Sequelize, Model, Optional } from 'sequelize';
import bcrypt from 'bcrypt';

//todo Define the attributes for the User model
interface UserAttributes {
  id: number;
  username: string;
  email: string;
  password: string;
  favorite_movies:string[]
}

//todo Define the optional attributes for creating a new User
interface UserCreationAttributes extends Optional<UserAttributes, 'id'> {}

//todo Define the User class extending Sequelize's Model
export class User extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
  public id!: number;
  public username!: string;
  public email!: string;
  public password!: string;
  public favorite_movies!:string[];
  // public reviewsId?: string[];

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  //todo Method to hash and set the password for the user
  public async setPassword(password: string) {
    const saltRounds = 10;
    this.password = await bcrypt.hash(password, saltRounds);
  }
}

//todo Define the UserFactory function to initialize the User model
export function UserFactory(sequelize: Sequelize): typeof User {
  User.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      username: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      favorite_movies:{
        type:DataTypes.ARRAY(DataTypes.STRING),
        allowNull: true,
      },
      // reviewsID:{
      //   type:DataTypes.ARRAY(DataTypes.STRING),
      //   allowNull: true,
      // }
      
    },

    {
      tableName: 'users',  //todo Name of the table in PostgreSQL
      sequelize,//todo The Sequelize instance that connects to PostgreSQL
      hooks: {
        //todo Before creating a new user, hash and set the password
        beforeCreate: async (user: User) => {
          await user.setPassword(user.password);
        },
        //todo Before updating a user, hash and set the new password if it has changed
        beforeUpdate: async (user: User) => {
          if (user.changed('password')) {
            await user.setPassword(user.password);
          }
        },
      }
    }
  );

  return User;  //todo Return the initialized User model
}
