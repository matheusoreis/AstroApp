import type { Unit } from "@/entities/postgres/unit.ts";

export interface IUnitsRepository {
  fetch(): Promise<Unit[]>;
}
