export default class CError extends Error {
  statusCode: number;

  constructor(message: string, statusCode?: number) {
    super();
    this.message = message;
    this.statusCode = statusCode || 500;
  }
}
