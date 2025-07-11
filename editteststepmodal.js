import React, { useEffect, useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
} from '@mui/material';

const EditTestStepModal = ({
  open,
  handleClose,
  testStep,
  testCaseId,
  orderId,
  userSoeid,
  onTestStepUpdated,
}) => {
  const [stepData, setStepData] = useState('');
  const [expectedResult, setExpectedResult] = useState('');
  const [actualResult, setActualResult] = useState('');
  const [statusOptions, setStatusOptions] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState('');

  useEffect(() => {
    if (testStep) {
      setStepData(testStep.test_step);
      setExpectedResult(testStep.expected_result);
      setActualResult(testStep.actual_result);
      setSelectedStatus(testStep.test_step_status);
    }
  }, [testStep]);

  useEffect(() => {
    const fetchStatuses = async () => {
      try {
        const res = await fetch('/api/test-step/test-step-status', {
          headers: {
            'Content-Type': 'application/json',
            'x-user-soeid': userSoeid,
          },
        });
        const statuses = await res.json();
        setStatusOptions(statuses);
      } catch (err) {
        console.error('Error fetching statuses:', err);
      }
    };

    fetchStatuses();
  }, [userSoeid]);

  const handleSave = async () => {
    const statusObj = statusOptions.find(
      (option) => option.test_step_status === selectedStatus
    );

    if (!statusObj) {
      alert('Please select a valid status.');
      return;
    }

    try {
      const url = `/api/test-step/edit/${testCaseId}/${orderId}?test_step_data=${encodeURIComponent(
        stepData
      )}&expected_result_data=${encodeURIComponent(
        expectedResult
      )}&actual_result_data=${encodeURIComponent(
        actualResult
      )}&test_step_status=${statusObj.id}`;

      const res = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-user-soeid': userSoeid,
        },
      });

      if (!res.ok) throw new Error('Failed to update test step');

      onTestStepUpdated();
      handleClose();
    } catch (err) {
      console.error('Error saving test step:', err);
    }
  };

  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
      <DialogTitle>Edit Test Step</DialogTitle>
      <DialogContent>
        <TextField
          fullWidth
          label="Test Step"
          value={stepData}
          onChange={(e) => setStepData(e.target.value)}
          margin="dense"
        />
        <TextField
          fullWidth
          label="Expected Result"
          value={expectedResult}
          onChange={(e) => setExpectedResult(e.target.value)}
          margin="dense"
        />
        <FormControl fullWidth margin="dense">
          <InputLabel>Status</InputLabel>
          <Select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            label="Status"
          >
            {statusOptions.map((option) => (
              <MenuItem key={option.id} value={option.test_step_status}>
                {option.test_step_status}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <TextField
          fullWidth
          label="Actual Result"
          value={actualResult}
          onChange={(e) => setActualResult(e.target.value)}
          margin="dense"
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleSave} variant="contained">
          Save Changes
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditTestStepModal;