import { Sequelize, ConnectionOptions } from 'sequelize';

const options: ConnectionOptions = {
    database: 'escuela',
    host: 'localhost',
    password: 'Mafs1920',
    username: 'root',
};

const sequelize = new Sequelize('escuela', 'root', 'Mafs1920', {
    host: 'localhost',
    dialect: 'mysql'
    /* one of 'mysql' | 'mariadb' | 'postgres' | 'mssql' */
});

try {
    async () => await sequelize.authenticate();
    console.log('Connection has been established successfully.');
} catch (error) {
    console.error('Unable to connect to the database:', error);
}
export default sequelize;