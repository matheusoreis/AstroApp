import { postgres } from "./database.ts";
import { config } from "dotenv";

import CandidateModel from "./models/candidate.ts";
import EducationModel from "./models/education.ts";
import SectorModel from "./models/sector.ts";
import TagCandidateModel from "./models/tag-candidate.ts";
import UnitModel from "./models/unit.ts";

config();

async function syncDatabase() {
  const force: boolean = process.env.FORCE_TABLES?.toLowerCase() === "true";

  try {
    await postgres.authenticate();

    await UnitModel.sync({ force });
    await EducationModel.sync({ force });
    await SectorModel.sync({ force });
    await TagCandidateModel.sync({ force });
    await CandidateModel.sync({ force });

    console.log("✅ Banco de dados sincronizado com sucesso!");
  } catch (error) {
    console.error("❌ Erro ao sincronizar o banco de dados:", error);
  } finally {
    await postgres.close();
  }
}

syncDatabase();
