const sequelize = require('sequelize');
const { DataTypes} = require ('sequelize');
const {v4: uuidv4} = require ('uuid');
// Exportamos una funcion que define el modelo de los temperaments
// Luego le injectamos la conexion a sequelize.

module.exports = (sequelize)=>{
//Definimos el modelo
    sequelize.define('temperaments',{
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: ()=>uuidv4()
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        }
    }) 
}
