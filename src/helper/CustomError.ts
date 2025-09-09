export class CustomError extends Error {
  statusCode: number;
  constructor(message: string, statusCode: number, text?: string) {
    super();
    this.message = message;
    this.statusCode = statusCode;
  }
}
