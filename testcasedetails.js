'use client';

import React, { useState } from 'react';
import { Box, Chip, IconButton } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import EditIcon from '@mui/icons-material/Edit';
// import DeleteIcon from '@mui/icons-material/Delete';
import EditTestStepModal from './EditTestStepModal'; // ensure this path is correct

export default function TestCaseDetails({ testCase }) {
  const [selectedStep, setSelectedStep] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  if (!testCase || !Array.isArray(testCase.teststeps) || testCase.teststeps.length === 0) {
    return <Box sx={{ p: 2 }}>No test case details available.</Box>;
  }

  const handleEditClick = (step) => {
    setSelectedStep(step);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setSelectedStep(null);
  };

  const handleStepSave = (updatedStep) => {
    console.log('Updated Step:', updatedStep);
    // TODO: Update this in state/backend if needed
    setIsModalOpen(false);
  };

  const columns = [
    {
      field: 'step',
      headerName: 'Test Steps',
      flex: 1,
      minWidth: 300,
    },
    {
      field: 'expected_result',
      headerName: 'Expected Result',
      flex: 1,
      minWidth: 300,
    },
    {
      field: 'actual_result',
      headerName: 'Actual Result',
      flex: 1,
      minWidth: 300,
    },
    {
      field: 'status',
      headerName: 'Status',
      width: 120,
      renderCell: (params) => (
        <Chip
          label={params.value || 'Pending'}
          size="small"
          color={params.value === 'Pass' ? 'success' : params.value === 'Fail' ? 'error' : 'default'}
          variant="outlined"
        />
      ),
    },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 100,
      sortable: false,
      renderCell: (params) => (
        <IconButton
          onClick={() => handleEditClick(params.row)}
        >
          <EditIcon fontSize="small" />
        </IconButton>
        // <IconButton><DeleteIcon fontSize="small" /></IconButton>
      ),
    },
  ];

  const rows = (testCase.teststeps || []).map((step, index) => ({
    id: step.teststep_orderid || index,
    step: step.teststep_steps,
    expected_result: step.teststep_expected_result,
    actual_result: step.teststep_actual_result,
    status: step.teststep_status,
    ...step, // retain full object for edit
  }));

  return (
    <Box sx={{ width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        getRowId={(row) => row.id}
        autoHeight
        checkboxSelection
        disableRowSelectionOnClick
        pageSizeOptions={[5, 10, 25, 100]}
        sx={{
          border: 'none',
          fontSize: '14px',
        }}
        initialState={{
          pagination: { paginationModel: { pageSize: 10 } },
        }}
      />

      {/* Edit Modal */}
      <EditTestStepModal
        open={isModalOpen}
        stepData={selectedStep}
        onClose={handleModalClose}
        onSave={handleStepSave}
      />
    </Box>
  );
}