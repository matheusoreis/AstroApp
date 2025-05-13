import type { IUnitsRepository } from "@/interfaces/postgres/units.ts";
import type { Unit } from "@/entities/postgres/unit.ts";

export class UnitsService {
  constructor(private unitsRepository: IUnitsRepository) {}

  async fetch(): Promise<{ data?: Unit[]; error?: string }> {
    try {
      return {
        data: await this.unitsRepository.fetch(),
      };
    } catch (e) {
      const error =
        e instanceof Error
          ? e.message
          : "Erro desconhecido ao buscar as unidades.";

      return {
        error: error,
      };
    }
  }
}
