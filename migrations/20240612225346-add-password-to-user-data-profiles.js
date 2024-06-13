"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn("UserDataProfiles", "password", {
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: "changeme", // default value for existing rows
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn("UserDataProfiles", "password");
  },
};
