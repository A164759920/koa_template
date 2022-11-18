const { DataTypes } = require("sequelize");

const seq = require("../database/mySQL.js");

const UA = seq.define(
  "UA",
  {
    ipv4: {
      type: DataTypes.INTEGER(10).UNSIGNED,
      allowNull: false,
    },
    os: {
      type: DataTypes.STRING(40),
      allowNull: true,
    },
    browser: {
      type: DataTypes.STRING(40),
      allowNull: true,
    },
    device: {
      type: DataTypes.STRING(40),
      allowNull: true,
    },
    lastdate: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  },
  {
    timestamps: true,
    createdAt: "lastdate",
    updatedAt: false,
    tableName: "uainfo",
  }
);
module.exports = UA;
