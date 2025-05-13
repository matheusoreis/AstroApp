import type { Unit } from "@/domains/entities/postgres/unit.ts";
import type { IUnitsRepository } from "@/domains/interfaces/postgres/units.ts";
import UnitModel from "../database/models/unit.ts";

export class UnitsRepository implements IUnitsRepository {
  async fetch(): Promise<Unit[]> {
    try {
      const units: UnitModel[] = await UnitModel.findAll();
      return units.map((unit: UnitModel) => unit.toJSON()) as Unit[];
    } catch (error) {
      throw new Error(`Não foi possível buscar as unidades. Erro: ${error}`);
    }
  }
}
