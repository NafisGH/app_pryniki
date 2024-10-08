
import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  CircularProgress,
  Alert,
} from '@mui/material';
import { createDocument, updateDocument } from '../services/documentService';
import { Document } from '../types';
import { useSnackbar } from 'notistack';

interface DocumentFormProps {
  open: boolean;
  onClose: () => void;
  onSuccess: (document: Document) => void;
  document?: Document | null;
}

const DocumentForm: React.FC<DocumentFormProps> = ({ open, onClose, onSuccess, document }) => {
  const isEditing = Boolean(document);

  const [formData, setFormData] = useState<Omit<Document, 'id'>>({
    companySigDate: document?.companySigDate || '',
    companySignatureName: document?.companySignatureName || '',
    documentName: document?.documentName || '',
    documentStatus: document?.documentStatus || '',
    documentType: document?.documentType || '',
    employeeNumber: document?.employeeNumber || '',
    employeeSigDate: document?.employeeSigDate || '',
    employeeSignatureName: document?.employeeSignatureName || '',
  });

  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const { enqueueSnackbar } = useSnackbar();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async () => {
    setLoading(true);
    setError('');

    try {
      if (isEditing && document) {
        const response = await updateDocument(document.id, formData);
        if (response.error_code === 0) {
          onSuccess(response.data);
          enqueueSnackbar('Документ успешно обновлен', { variant: 'success' });
        } else {
        enqueueSnackbar(response.error_message || 'Ошибка обновления документа', { variant: 'error' });
        }
      } else {
        const response = await createDocument(formData);
        if (response.error_code === 0) {
          onSuccess(response.data);
          enqueueSnackbar('Документ успешно создан', { variant: 'success' });
        } else {
        enqueueSnackbar(response.error_message || 'Ошибка создания документа', { variant: 'error' });
        }
      }
    } catch (err) {
    enqueueSnackbar('Ошибка сети', { variant: 'error' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>{isEditing ? 'Редактировать документ' : 'Создать документ'}</DialogTitle>
      <DialogContent>
        {error && <Alert severity="error">{error}</Alert>}
        <TextField
          label="Название документа"
          name="documentName"
          fullWidth
          margin="normal"
          value={formData.documentName}
          onChange={handleChange}
        />
        <TextField
          label="Статус"
          name="documentStatus"
          fullWidth
          margin="normal"
          value={formData.documentStatus}
          onChange={handleChange}
        />
        <TextField
          label="Тип"
          name="documentType"
          fullWidth
          margin="normal"
          value={formData.documentType}
          onChange={handleChange}
        />
        <TextField
          label="Номер сотрудника"
          name="employeeNumber"
          fullWidth
          margin="normal"
          value={formData.employeeNumber}
          onChange={handleChange}
        />
        <TextField
          label="Дата подписи сотрудника (ISO формат)"
          name="employeeSigDate"
          fullWidth
          margin="normal"
          value={formData.employeeSigDate}
          onChange={handleChange}
        />
        <TextField
          label="Подпись сотрудника"
          name="employeeSignatureName"
          fullWidth
          margin="normal"
          value={formData.employeeSignatureName}
          onChange={handleChange}
        />
        <TextField
          label="Дата подписи компании (ISO формат)"
          name="companySigDate"
          fullWidth
          margin="normal"
          value={formData.companySigDate}
          onChange={handleChange}
        />
        <TextField
          label="Подпись компании"
          name="companySignatureName"
          fullWidth
          margin="normal"
          value={formData.companySignatureName}
          onChange={handleChange}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Отмена</Button>
        <Button onClick={handleSubmit} variant="contained" disabled={loading}>
          {loading ? <CircularProgress size={24} /> : 'Сохранить'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DocumentForm;
