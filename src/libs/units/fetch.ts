import type { Unit } from "@/domains/entities/postgres/unit.ts";
import { UnitsService } from "@/domains/services/units.ts";
import { UnitsRepository } from "@/infrastructure/repositories/units.ts";

export default async function getUnits(): Promise<{
  data?: Unit[];
  error?: string;
}> {
  const repo = new UnitsRepository();
  const service = new UnitsService(repo);

  return await service.fetch();
}
