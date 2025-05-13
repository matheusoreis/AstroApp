import { DataTypes, Model } from "sequelize";
import { postgres } from "../database.ts";

class EducationModel extends Model {}

EducationModel.init(
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
    modelName: "Education",
    tableName: "escolaridades",
    timestamps: true,
    createdAt: "criado_em",
    updatedAt: "atualizado_em",
  },
);

export default EducationModel;
