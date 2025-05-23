export default interface ServiceResult<T> {
  data?: T;
  error?: Record<string, string>;
}
