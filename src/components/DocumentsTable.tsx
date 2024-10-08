

import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  IconButton,
} from '@mui/material';
import { Document } from '../types';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

interface DocumentsTableProps {
  documents: Document[];
  onDelete: (id: string) => void;
  onEdit: (document: Document) => void;
}

const DocumentsTable: React.FC<DocumentsTableProps> = ({ documents, onDelete, onEdit }) => {
  return (
    <Table sx={{ mt: 2 }}>
      <TableHead>
        <TableRow>
          <TableCell>Название документа</TableCell>
          <TableCell>Статус</TableCell>
          <TableCell>Тип</TableCell>
          <TableCell>Номер сотрудника</TableCell>
          <TableCell>Дата подписи сотрудника</TableCell>
          <TableCell>Подпись сотрудника</TableCell>
          <TableCell>Дата подписи компании</TableCell>
          <TableCell>Подпись компании</TableCell>
          <TableCell align="right">Действия</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {documents.map((doc) => (
          <TableRow key={doc.id}>
            <TableCell>{doc.documentName}</TableCell>
            <TableCell>{doc.documentStatus}</TableCell>
            <TableCell>{doc.documentType}</TableCell>
            <TableCell>{doc.employeeNumber}</TableCell>
            <TableCell>{doc.employeeSigDate}</TableCell>
            <TableCell>{doc.employeeSignatureName}</TableCell>
            <TableCell>{doc.companySigDate}</TableCell>
            <TableCell>{doc.companySignatureName}</TableCell>
            <TableCell align="right">
              <IconButton onClick={() => onEdit(doc)}>
                <EditIcon />
              </IconButton>
              <IconButton onClick={() => onDelete(doc.id)}>
                <DeleteIcon />
              </IconButton>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default DocumentsTable;
