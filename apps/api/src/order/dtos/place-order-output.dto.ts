// TODO: Refactor this into a base class DTO for standard response format
export interface PlaceOrderOutputDto {
  success: boolean;
  message: string;
  errorCode?: string;
}
