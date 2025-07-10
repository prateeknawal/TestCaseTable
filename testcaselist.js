'use client';

import React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Chip, IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';

export default function TestCaseList({ testCases, onRowClick, selectedRowId }) {
  const columns = [
    { field: 'id', headerName: 'Test Case ID', width: 140 },
    {
      field: 'title',
      headerName: 'Test Case Name',
      flex: 1,
      minWidth: 250,
    },
    {
      field: 'test_case_type',
      headerName: 'Type',
      width: 120,
      renderCell: (params) => (
        <Chip label={params.value} size="small" color="primary" variant="outlined" />
      ),
    },
    {
      field: 'status',
      headerName: 'Status',
      width: 120,
      renderCell: (params) => (
        <Chip label={params.value || 'Pending'} size="small" color="default" variant="outlined" />
      ),
    },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 100,
      sortable: false,
      renderCell: () => <IconButton><EditIcon fontSize="small" /></IconButton>,
    },
  ];

  
  return (
    <DataGrid
      rows={testCases}
      columns={columns}
      getRowId={(row) => row.id}
      autoHeight
      pagination
      checkboxSelection
      disableRowSelectionOnClick
      rowHeight={40}
      pageSizeOptions={[5, 10, 25, 100]}
      onRowClick={onRowClick}
      sx={{
        border: 'none',
        fontSize: '14px',
      }}
      initialState={{
        pagination: { paginationModel: { pageSize: 10 } },
      }}
    />
  );
}