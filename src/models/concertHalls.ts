'use strict';
import Sequelize, {
  DataTypes,
  Model,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
} from 'sequelize';
import Show from './shows';

class ConcertHall extends Model<
  InferAttributes<ConcertHall>,
  InferCreationAttributes<ConcertHall>
> {
  declare concertHallId: CreationOptional<number>;
  declare name: string;
  declare address: string;
  // declare seatInformation: string;

  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;

  static initiate(sequelize: Sequelize.Sequelize) {
    ConcertHall.init(
      {
        concertHallId: {
          type: DataTypes.INTEGER.UNSIGNED,
          autoIncrement: true,
          primaryKey: true,
        },
        name: {
          allowNull: false,
          type: DataTypes.STRING,
        },
        address: {
          allowNull: false,
          type: DataTypes.STRING,
        },
        // seatInformation: {
        //   allowNull: false,
        //   type: DataTypes.STRING,
        // }
        createdAt: DataTypes.DATE,
        updatedAt: DataTypes.DATE,
      },
      {
        modelName: 'ConcertHalls',
        tableName: 'ConcertHalls',
        sequelize,
      }
    );
  }
  static associate() {
    this.hasMany(Show, {
      foreignKey: 'concertHallId',
      sourceKey: 'concertHallId',
    });
  }
}

export default ConcertHall;
