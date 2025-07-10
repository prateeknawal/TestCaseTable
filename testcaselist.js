'use client';

import React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Box } from '@mui/material';

const TestCaseList = ({ testCases, onRowClick, selectedRowId }) => {
  const columns = [
    { field: 'test_case_id', headerName: 'Test Case ID', width: 160 },
    {
      field: 'title',
      headerName: 'Test Case Name',
      flex: 1,
      renderCell: (params) => <span>{params.value || '[No Title]'}</span>,
    },
  ];

  return (
    <Box height="100%" sx={{ borderRight: '1px solid #ccc' }}>
      <DataGrid
        rows={testCases}
        columns={columns}
        pageSize={100}
        getRowId={(row) => row.id}
        hideFooter
        rowSelectionModel={selectedRowId ? [selectedRowId] : []}
        onRowClick={(params) => onRowClick(params)}
        sx={{ border: 'none', height: '100%' }}
      />
    </Box>
  );
};

export default TestCaseList;