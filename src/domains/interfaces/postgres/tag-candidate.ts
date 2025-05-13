import type { TagCandidate } from "@/entities/postgres/tag-candidate.ts";

export interface ITagCandidatesRepository {
  fetch(): Promise<TagCandidate[]>;
}
