const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Hinhanh extends Model {
    static associate(models) {
      Hinhanh.belongsTo(models.Sanpham, { foreignKey: "SP_Ma" });
    }
  }
  Hinhanh.init(
    {
      HA_Ma: DataTypes.INTEGER,
      SP_Ma: DataTypes.INTEGER,
      Duongdan: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Hinhanh",
    }
  );
  return Hinhanh;
};
