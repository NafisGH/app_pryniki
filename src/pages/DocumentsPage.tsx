import React, { useEffect, useState } from 'react';
import {
  Container,
  Typography,
  Button,
  Box,
  CircularProgress,
  Alert,
} from '@mui/material';
import { getDocuments, deleteDocument } from '../services/documentService';
import { Document } from '../types';
import DocumentsTable from '../components/DocumentsTable';
import DocumentForm from '../components/DocumentForm';
import { useNavigate } from 'react-router-dom';
import { useSnackbar } from 'notistack'; 

const DocumentsPage: React.FC = () => {
  const [documents, setDocuments] = useState<Document[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');
  const [openForm, setOpenForm] = useState<boolean>(false);
  const [editingDocument, setEditingDocument] = useState<Document | null>(null);
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    fetchDocuments();
  }, []);

  const fetchDocuments = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await getDocuments();
      if (response.error_code === 0) {
        setDocuments(response.data);
        enqueueSnackbar('Документ успешно удален', { variant: 'success' });
      } else {
        enqueueSnackbar(response.error_message || 'Ошибка удаления документа', { variant: 'error' });
      }
    } catch (err) {
    enqueueSnackbar('Ошибка сети', { variant: 'error' });
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    setLoading(true);
    try {
      const response = await deleteDocument(id);
      if (response.error_code === 0) {
        setDocuments((prev) => prev.filter((doc) => doc.id !== id));
      } else {
        setError(response.error_message || 'Ошибка удаления');
      }
    } catch (err) {
      setError('Ошибка сети');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <Container maxWidth="lg">
      <Box sx={{ mt: 4, display: 'flex', justifyContent: 'space-between' }}>
        <Typography variant="h4">Документы</Typography>
        <Box>
          <Button variant="contained" onClick={() => setOpenForm(true)} sx={{ mr: 2 }}>
            Добавить
          </Button>
          <Button variant="outlined" onClick={handleLogout}>
            Выйти
          </Button>
        </Box>
      </Box>
      {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}
      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
          <CircularProgress />
        </Box>
      ) : (
        <DocumentsTable
          documents={documents}
          onDelete={handleDelete}
          onEdit={(doc) => {
            setEditingDocument(doc);
            setOpenForm(true);
          }}
        />
      )}
      {openForm && (
        <DocumentForm
          open={openForm}
          onClose={() => {
            setOpenForm(false);
            setEditingDocument(null);
          }}
          onSuccess={(doc) => {
            if (editingDocument) {
              setDocuments((prev) =>
                prev.map((d) => (d.id === doc.id ? doc : d))
              );
            } else {
              setDocuments((prev) => [doc, ...prev]);
            }
            setOpenForm(false);
            setEditingDocument(null);
          }}
          document={editingDocument}
        />
      )}
    </Container>
  );
};

export default DocumentsPage;
