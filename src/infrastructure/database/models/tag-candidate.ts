import { DataTypes, Model } from "sequelize";
import { postgres } from "../database.ts";

class TagCandidateModel extends Model {}

TagCandidateModel.init(
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
    modelName: "TagCandidate",
    tableName: "tags_candidato",
    timestamps: true,
    createdAt: "criado_em",
    updatedAt: "atualizado_em",
  },
);

export default TagCandidateModel;
