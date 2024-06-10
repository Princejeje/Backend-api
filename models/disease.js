// models/disease.js
module.exports = (sequelize, DataTypes) => {
  const Disease = sequelize.define("Disease", {
    photo: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    diseaseName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    otherNames: {
      type: DataTypes.STRING,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    causes: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    prevention: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  });

  return Disease;
};
