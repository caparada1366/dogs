const sequelize = require('sequelize');
const { DataTypes} = require ('sequelize');
// Exportamos una funcion que define el modelo de los temperaments
// Luego le injectamos la conexion a sequelize.

module.exports = (sequelize)=>{
//Definimos el modelo
    sequelize.define('temperaments',{
        code: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        nombre: {
            type: DataTypes.STRING,
            allowNull: false,
        }
    }) 
}
