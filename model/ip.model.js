const { DataTypes } = require("sequelize");

const seq = require("../database/mySQL.js");
// 定义ipinfo表中的元组(模型)
const IP = seq.define(
  "IP",
  {
    ipv4: {
      type: DataTypes.INTEGER(10).UNSIGNED,
      primaryKey: true,
      allowNull: false,
    },
    province: {
      type: DataTypes.STRING(40),
      defaultValue: null,
    },
    city: {
      type: DataTypes.STRING(40),
      defaultValue: null,
    },
    area: {
      type: DataTypes.STRING(40),
      defaultValue: null,
    },
    count: {
      type: DataTypes.SMALLINT(10).UNSIGNED,
      defaultValue: null,
    },
  },
  {
    timestamps: false,
    tableName: "ipinfo",
  }
);

module.exports = IP;
