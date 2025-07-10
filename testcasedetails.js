import React from 'react';
import { Box, Typography, Checkbox, IconButton, Tooltip } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const TestCaseDetails = ({ testCase }) => {
  if (!testCase || !testCase.test_case_id) return null;

  const testSteps = Array.isArray(testCase.test_step_steps)
    ? testCase.test_step_steps
    : [
        {
          step: testCase.test_step_steps,
          type: testCase.test_case_type,
          status: testCase.test_step_status,
        },
      ];

  return (
    <Box px={2}>
      <Typography variant="h6" gutterBottom>
        Test Steps for: {testCase.title || 'Untitled Test Case'}
      </Typography>

      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: '40px 1fr 100px 100px 80px',
          borderBottom: '2px solid #ddd',
          fontWeight: 'bold',
          padding: '8px 0',
        }}
      >
        <Box></Box>
        <Box>Test Step Description</Box>
        <Box>Type</Box>
        <Box>Status</Box>
        <Box>Actions</Box>
      </Box>

      {testSteps.map((step, idx) => (
        <Box
          key={idx}
          sx={{
            display: 'grid',
            gridTemplateColumns: '40px 1fr 100px 100px 80px',
            alignItems: 'center',
            borderBottom: '1px solid #eee',
            padding: '6px 0',
          }}
        >
          <Checkbox size="small" />
          <Box>{step.step || '-'}</Box>
          <Box>{step.type || testCase.test_case_type || '-'}</Box>
          <Box>{step.status || testCase.test_step_status || '-'}</Box>
          <Box>
            <Tooltip title="Edit">
              <IconButton size="small">
                <EditIcon fontSize="small" />
              </IconButton>
            </Tooltip>
            <Tooltip title="Delete">
              <IconButton size="small" color="error">
                <DeleteIcon fontSize="small" />
              </IconButton>
            </Tooltip>
          </Box>
        </Box>
      ))}
    </Box>
  );
};

export default TestCaseDetails;