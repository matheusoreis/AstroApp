import { DataTypes, Model } from "sequelize";
import { postgres } from "../database.ts";

class SectorModel extends Model {}

SectorModel.init(
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
    modelName: "Sector",
    tableName: "setores",
    timestamps: true,
    createdAt: "criado_em",
    updatedAt: "atualizado_em",
  },
);

export default SectorModel;
