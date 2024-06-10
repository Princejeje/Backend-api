// models/historyPrediction.js
module.exports = (sequelize, DataTypes) => {
  const HistoryPrediction = sequelize.define("HistoryPrediction", {
    diseaseName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    confidence: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    imageUrl: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  return HistoryPrediction;
};
