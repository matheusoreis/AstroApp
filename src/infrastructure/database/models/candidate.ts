import { DataTypes, Model } from "sequelize";
import { postgres } from "../database.ts";
import UnitModel from "./unit.ts";
import TagCandidateModel from "./tag-candidate.ts";
import EducationModel from "./education.ts";
import SectorModel from "./sector.ts";

class CandidateModel extends Model {}

CandidateModel.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      field: "nome",
      type: DataTypes.STRING,
      allowNull: false,
    },
    document: {
      field: "documento",
      type: DataTypes.STRING,
      allowNull: false,
    },
    phone: {
      field: "telefone",
      type: DataTypes.STRING,
      allowNull: false,
    },
    dateOfBirth: {
      field: "nascimento",
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    isPcd: {
      field: "pcd",
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
  },
  {
    sequelize: postgres,
    modelName: "Candidate",
    tableName: "candidatos",
    timestamps: true,
    createdAt: "criado_em",
    updatedAt: "atualizado_em",
  },
);

CandidateModel.belongsTo(UnitModel, { foreignKey: "primeira_unidade" });
CandidateModel.belongsTo(UnitModel, { foreignKey: "segunda_unidade" });
CandidateModel.belongsTo(TagCandidateModel, { foreignKey: "tag_candidato" });
CandidateModel.belongsTo(EducationModel, { foreignKey: "escolaridade" });
CandidateModel.belongsTo(SectorModel, { foreignKey: "setor" });

export default CandidateModel;
