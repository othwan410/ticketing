'use strict';
import Sequelize, {
  DataTypes,
  Model,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
} from 'sequelize';
import Show from './shows';
import Reservation from './reservations';

class User extends Model<InferAttributes<User>, InferCreationAttributes<User>> {
  declare userId: CreationOptional<number>;
  declare name: string;
  declare email: string;
  declare password: string;
  declare point: CreationOptional<number>;
  declare admin: boolean;

  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;

  static initiate(sequelize: Sequelize.Sequelize) {
    User.init(
      {
        userId: {
          type: DataTypes.INTEGER.UNSIGNED,
          autoIncrement: true,
          primaryKey: true,
        },
        name: {
          allowNull: false,
          type: DataTypes.STRING(20),
        },
        email: {
          allowNull: false,
          type: DataTypes.STRING(20),
          unique: true,
        },
        password: {
          allowNull: false,
          type: DataTypes.STRING(255),
        },
        point: {
          type: DataTypes.INTEGER.UNSIGNED,
        },
        admin: {
          allowNull: false,
          type: DataTypes.BOOLEAN,
        },
        createdAt: DataTypes.DATE,
        updatedAt: DataTypes.DATE,
      },
      {
        modelName: 'Users',
        tableName: 'Users',
        sequelize,
      }
    );
  }
  static associate() {
    this.hasMany(Show, { foreignKey: 'userId', sourceKey: 'userId' });
    this.hasMany(Reservation, { foreignKey: 'userId', sourceKey: 'userId' });
  }
}

export default User;
