import { Sequelize, Op, Model, DataTypes, Optional } from "sequelize";
import { UserI } from '../interfaces/interface';
import sequelize from '../DB/conexion';

// para crear un usaurio el id es "Opcional"
interface UserCreationAttributes extends Optional<UserI, "id"> {}

class User extends Model<UserI, UserCreationAttributes> {
    id!: number;
    nombre!: string;
    apellido!: string;
    edad!: number;
    password!: string;
}

User.init(
    {
    id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
    },
    nombre: {
        type: DataTypes.STRING(50),
        allowNull: false,
    },
    apellido: {
        type: DataTypes.STRING(50),
        allowNull: true,
    },
    edad: {
            type: DataTypes.INTEGER,
        allowNull: true,
    },
    password: {
        type: DataTypes.STRING(128),
        allowNull: true,
    },
}, {
    tableName: "usuarios",
    freezeTableName: true,
    timestamps: false,
    sequelize, 

});

export default User;