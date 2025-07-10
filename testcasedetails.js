'use client';

import React from 'react';
import { Box, Chip, IconButton } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

export default function TestCaseDetails({ testCase }) {
  const columns = [
    {
      field: 'step',
      headerName: 'Test Step Description',
      flex: 1,
      minWidth: 300,
    },
    {
      field: 'expected_result',
      headerName: 'Expected Result',
      flex: 1,
      minWidth: 200,
    },
    {
      field: 'actual_result',
      headerName: 'Actual Result',
      flex: 1,
      minWidth: 200,
    },
    {
      field: 'status',
      headerName: 'Status',
      width: 120,
      renderCell: (params) => (
        <Chip
          label={params.value || 'Pending'}
          size="small"
          color={params.value === 'Pass' ? 'success' : 'default'}
          variant="outlined"
        />
      ),
    },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 100,
      sortable: false,
      renderCell: () => (
        <>
          <IconButton><EditIcon fontSize="small" /></IconButton>
          <IconButton><DeleteIcon fontSize="small" /></IconButton>
        </>
      ),
    },
  ];

  const rows = testCase.test_steps.map((step, index) => ({
    id: index,
    step: step.step,
    expected_result: step.expected_result,
    actual_result: step.actual_result,
    status: step.status,
  }));

  return (
    <Box sx={{ width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        getRowId={(row) => row.id}
        checkboxSelection
        autoHeight
        pagination
        rowHeight={40}
        pageSizeOptions={[5, 10, 25, 100]}
        disableRowSelectionOnClick
        sx={{
          border: 'none',
          fontSize: '14px',
        }}
        initialState={{
          pagination: { paginationModel: { pageSize: 10 } },
        }}
      />
    </Box>
  );
}