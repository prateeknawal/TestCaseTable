import React from 'react';
import { Typography, Box, Divider, Chip, Stack, Paper } from '@mui/material';

const TestCaseDetails = ({ testCase }) => {
  if (!testCase) {
    return (
      <Box p={2}>
        <Typography variant="body1">Select a test case to view details</Typography>
      </Box>
    );
  }

  return (
    <Box p={2}>
      <Typography variant="h6" gutterBottom>
        Description
      </Typography>
      <Typography
        variant="body2"
        sx={{ whiteSpace: 'pre-line', mb: 2 }}
        dangerouslySetInnerHTML={{ __html: testCase.description }}
      />
      <Divider />

      <Typography variant="h6" gutterBottom mt={3}>
        Test Steps
      </Typography>

      {testCase.test_step_steps.map((step, index) => (
        <Paper key={index} variant="outlined" sx={{ mb: 2, p: 2 }}>
          <Stack direction="row" justifyContent="space-between">
            <Typography fontWeight="bold">Step 0{index + 1}</Typography>
            <Chip
              label={testCase.test_step_status || 'pass'}
              color="success"
              size="small"
            />
          </Stack>
          <Typography variant="body2" sx={{ whiteSpace: 'pre-line', mt: 1 }}>
            {step}
          </Typography>
        </Paper>
      ))}
    </Box>
  );
};

export default TestCaseDetails;