import api from './api';
import { Document, ApiResponse } from '../types';

export const getDocuments = async (): Promise<ApiResponse<Document[]>> => {
  const response = await api.get<ApiResponse<Document[]>>('/ru/data/v3/testmethods/docs/userdocs/get');
  return response.data;
};

export const createDocument = async (document: Omit<Document, 'id'>): Promise<ApiResponse<Document>> => {
  const response = await api.post<ApiResponse<Document>>('/ru/data/v3/testmethods/docs/userdocs/create', document);
  return response.data;
};

export const updateDocument = async (id: string, document: Omit<Document, 'id'>): Promise<ApiResponse<Document>> => {
  const response = await api.post<ApiResponse<Document>>(`/ru/data/v3/testmethods/docs/userdocs/set/${id}`, document);
  return response.data;
};

export const deleteDocument = async (id: string): Promise<ApiResponse<null>> => {
  const response = await api.post<ApiResponse<null>>(`/ru/data/v3/testmethods/docs/userdocs/delete/${id}`);
  return response.data;
};
