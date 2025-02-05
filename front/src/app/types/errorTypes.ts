export interface ErrorType {
  status: number;
  data: ErrorTypeData;
}

export interface ErrorTypeData {
  status: string;
  message: string;
  error_name: string;
}
