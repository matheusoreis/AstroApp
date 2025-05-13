import type { Education } from "./education.ts";
import type { Sector } from "./sector.ts";
import type { TagCandidate } from "./tag-candidate.ts";
import type { Unit } from "./unit.ts";

export type Candidate = {
  id: number;
  name: string;
  document: string;
  phone: string;
  dateOfBirth: Date;
  isPcd: boolean;
  firstUnit: Unit;
  secondUnit: Unit;
  tag: TagCandidate;
  education: Education;
  sector: Sector;
  createdAt?: Date;
  updatedAt?: Date;
};
