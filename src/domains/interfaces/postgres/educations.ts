import type { Education } from "@/entities/postgres/education.ts";

export interface IEducationsRepository {
  fetch(): Promise<Education[]>;
}
