import type { Sector } from "@/entities/postgres/sector.ts";

export interface ISectorsRepository {
  fetch(): Promise<Sector[]>;
}
