export class RowNotAffectedError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "RowNotAffectedError";
  }
}
