export class ProductNotAvailableError extends Error {
  public readonly statusCode: number;

  constructor(message: string, statusCode = 500) {
    super(message);
    this.name = 'ProductNotAvailableError';
    this.statusCode = statusCode;
  }
}
