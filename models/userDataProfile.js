const bcrypt = require("bcrypt");

module.exports = (sequelize, DataTypes) => {
  const UserDataProfile = sequelize.define("UserDataProfile", {
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    address: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    phoneNumber: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  UserDataProfile.beforeCreate(async (user) => {
    user.password = await bcrypt.hash(user.password, 10);
  });

  UserDataProfile.beforeUpdate(async (user) => {
    if (user.changed("password")) {
      user.password = await bcrypt.hash(user.password, 10);
    }
  });

  return UserDataProfile;
};
