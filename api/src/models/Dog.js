const { DataTypes } = require('sequelize');
const {v4: uuidv4} = require ('uuid');
// Exportamos una funcion que define el modelo de los Dogs
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('dog', {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: ()=>uuidv4()
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    image: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    altura: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    peso: {
      type: DataTypes.STRING,
      allowNull: false
    },
    anos_Vida: {
      type: DataTypes.STRING,
      allowNull: false
    }

  },{ timestamps: false});
};
