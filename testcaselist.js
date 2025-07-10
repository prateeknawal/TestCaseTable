'use client';

import React, { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Checkbox,
  Paper,
  Typography,
  Chip,
  Tooltip,
  IconButton,
  Box,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

export default function TestCaseList({ testCases = [], onRowClick, selectedRowId }) {
  const [selectedTestCaseIds, setSelectedTestCaseIds] = useState([]);

  const handleCheckboxToggle = (id) => {
    setSelectedTestCaseIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  return (
    <Box p={2}>
      <Typography variant="h6" gutterBottom>
        Test Cases
      </Typography>
      <TableContainer component={Paper}>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell padding="checkbox" />
              <TableCell><strong>Test Case ID</strong></TableCell>
              <TableCell><strong>Test Case Name</strong></TableCell>
              <TableCell><strong>Type</strong></TableCell>
              <TableCell><strong>Status</strong></TableCell>
              <TableCell><strong>Actions</strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {testCases.map((tc) => (
              <TableRow
                key={tc.id}
                hover
                selected={tc.id === selectedRowId}
                onClick={() => onRowClick({ row: { id: tc.id } })}
                sx={{ cursor: 'pointer' }}
              >
                <TableCell padding="checkbox" onClick={(e) => e.stopPropagation()}>
                  <Checkbox
                    checked={selectedTestCaseIds.includes(tc.id)}
                    onChange={() => handleCheckboxToggle(tc.id)}
                  />
                </TableCell>
                <TableCell>{tc.id}</TableCell>
                <TableCell>{tc.title || 'Untitled Test Case'}</TableCell>
                <TableCell>
                  <Chip
                    label={tc.test_case_type || 'Functional'}
                    color="info"
                    size="small"
                  />
                </TableCell>
                <TableCell>
                  <Chip
                    label={tc.status || 'Pending'}
                    color={
                      tc.status?.toLowerCase() === 'passed'
                        ? 'success'
                        : tc.status?.toLowerCase() === 'failed'
                        ? 'error'
                        : 'default'
                    }
                    size="small"
                  />
                </TableCell>
                <TableCell onClick={(e) => e.stopPropagation()}>
                  <Tooltip title="Edit">
                    <IconButton size="small">
                      <EditIcon fontSize="inherit" />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Delete">
                    <IconButton size="small">
                      <DeleteIcon fontSize="inherit" />
                    </IconButton>
                  </Tooltip>
                </TableCell>
              </TableRow>
            ))}
            {testCases.length === 0 && (
              <TableRow>
                <TableCell colSpan={6} align="center">
                  No test cases available.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}