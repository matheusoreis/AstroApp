import type { Candidate } from "@/entities/postgres/candidate.ts";

export interface ICandidatesRepository {
  fetch(): Promise<Candidate[]>;
}
