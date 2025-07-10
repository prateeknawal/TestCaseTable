import React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Box, IconButton, Typography } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

export default function TestCaseDetails({ testCase }) {
  if (!testCase || !testCase.test_steps?.length) {
    return <Typography variant="body1">No test steps found.</Typography>;
  }

  const columns = [
    {
      field: 'step',
      headerName: 'Test Step Description',
      flex: 3,
      renderCell: (params) => (
        <Typography variant="body2" sx={{ whiteSpace: 'normal' }}>
          {params.value}
        </Typography>
      ),
    },
    {
      field: 'type',
      headerName: 'Type',
      flex: 1,
      renderCell: () => <Typography variant="caption">Functional</Typography>,
    },
    {
      field: 'status',
      headerName: 'Status',
      flex: 1,
      renderCell: (params) => (
        <Typography
          variant="caption"
          sx={{
            backgroundColor: '#f0f0f0',
            px: 1.5,
            py: 0.5,
            borderRadius: 2,
          }}
        >
          {params.value || 'Pending'}
        </Typography>
      ),
    },
    {
      field: 'actions',
      headerName: 'Actions',
      flex: 1,
      sortable: false,
      renderCell: () => (
        <Box>
          <IconButton color="primary" size="small">
            <EditIcon fontSize="small" />
          </IconButton>
          <IconButton color="error" size="small">
            <DeleteIcon fontSize="small" />
          </IconButton>
        </Box>
      ),
    },
  ];

  const rows = testCase.test_steps.map((step, index) => ({
    id: index + 1,
    step: step.step || 'N/A',
    expected_result: step.expected_result || 'N/A',
    actual_result: step.actual_result || 'N/A',
    status: step.status || 'Pending',
  }));

  return (
    <Box sx={{ height: 500, width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={10}
        checkboxSelection
        disableRowSelectionOnClick
        autoHeight
      />
    </Box>
  );
}