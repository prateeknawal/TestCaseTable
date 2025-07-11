import React, { useEffect, useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
} from '@mui/material';

const EditTestStepModal = ({ open, handleClose, testStep, onSave }) => {
  const [editedStep, setEditedStep] = useState({
    test_step: '',
    expected_result: '',
    status: '',
    actual_result: '',
  });
  const [statusOptions, setStatusOptions] = useState([]);

  useEffect(() => {
    if (testStep) {
      setEditedStep({
        test_step: testStep.test_step || '',
        expected_result: testStep.expected_result || '',
        status: testStep.teststep_status || '',
        actual_result: testStep.actual_result || '',
      });
    }
  }, [testStep]);

  useEffect(() => {
    const fetchStatusOptions = async () => {
      try {
        const response = await fetch('/api/test-step/test-step-status', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'x-user-soeid': sessionStorage.getItem('soeid') || '',
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch status options');
        }

        const data = await response.json();
        setStatusOptions(data);
      } catch (error) {
        console.error('Error fetching status options:', error);
      }
    };

    fetchStatusOptions();
  }, []);

  const handleInputChange = (field) => (event) => {
    setEditedStep({ ...editedStep, [field]: event.target.value });
  };

  const handleSave = async () => {
    const selectedStatus = statusOptions.find(
      (option) => option.status_name === editedStep.status
    );

    const payload = {
      test_case_id: testStep.test_case_id,
      order_id: testStep.order_id,
      test_step: editedStep.test_step,
      expected_result: editedStep.expected_result,
      actual_result: editedStep.actual_result,
      teststep_status_id: selectedStatus?.id || null,
    };

    try {
      const response = await fetch('/api/test-step/test-step-edit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-user-soeid': sessionStorage.getItem('soeid') || '',
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error('Failed to update test step');
      }

      onSave();
      handleClose();
    } catch (error) {
      console.error('Error updating test step:', error);
    }
  };

  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="md">
      <DialogTitle>Edit Test Step</DialogTitle>
      <DialogContent>
        <TextField
          fullWidth
          label="Test Step"
          value={editedStep.test_step}
          onChange={handleInputChange('test_step')}
          margin="dense"
        />
        <TextField
          fullWidth
          label="Expected Result"
          value={editedStep.expected_result}
          onChange={handleInputChange('expected_result')}
          margin="dense"
        />
        <FormControl fullWidth margin="dense">
          <InputLabel>Status</InputLabel>
          <Select
            value={editedStep.status}
            label="Status"
            onChange={handleInputChange('status')}
          >
            {statusOptions.map((option) => (
              <MenuItem key={option.id} value={option.status_name}>
                {option.status_name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <TextField
          fullWidth
          label="Actual Result"
          value={editedStep.actual_result}
          onChange={handleInputChange('actual_result')}
          margin="dense"
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleSave} variant="contained" color="primary">
          Save Changes
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditTestStepModal;