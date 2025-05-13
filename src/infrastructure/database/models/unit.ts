import { DataTypes, Model } from "sequelize";
import { postgres } from "../database.ts";

class UnitModel extends Model {}

UnitModel.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    description: {
      field: "descricao",
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize: postgres,
    modelName: "Unit",
    tableName: "unidades",
    timestamps: true,
    createdAt: "criado_em",
    updatedAt: "atualizado_em",
  },
);

export default UnitModel;
