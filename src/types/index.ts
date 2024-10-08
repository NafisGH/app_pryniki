export interface LoginResponse {
    data: {
      token: string;
    };
    error_code: number;
    error_message: string;
  }
  
  export interface Document {
    id: string;
    companySigDate: string;
    companySignatureName: string;
    documentName: string;
    documentStatus: string;
    documentType: string;
    employeeNumber: string;
    employeeSigDate: string;
    employeeSignatureName: string;
  }
  
  export interface DocumentsResponse {
    data: Document[];
    error_code: number;
    error_message: string;
  }
  
  export interface ApiResponse<T> {
    data: T;
    error_code: number;
    error_message: string;
  }
  