'use client';

import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  MenuItem,
  Box,
  Typography
} from '@mui/material';

export default function EditTestStepModal({ open, stepData, testCaseId, orderId, onClose, onSave }) {
  const [formState, setFormState] = useState({
    teststep_steps: '',
    teststep_expected_result: '',
    teststep_actual_result: '',
    teststep_status: '',
  });

  const [statusOptions, setStatusOptions] = useState([]);

  useEffect(() => {
    if (stepData) {
      setFormState({
        teststep_steps: stepData.teststep_steps || '',
        teststep_expected_result: stepData.teststep_expected_result || '',
        teststep_actual_result: stepData.teststep_actual_result || '',
        teststep_status: stepData.teststep_status || '',
      });
    }
  }, [stepData]);

  useEffect(() => {
    const fetchStatusOptions = async () => {
      try {
        const res = await fetch('http://127.0.0.1:8000/api/test-step/test-step-status', {
          headers: {
            'Content-Type': 'application/json',
            'x-user-soeid': 'your-soeid-here',
          },
        });
        const data = await res.json();
        setStatusOptions(data);
      } catch (error) {
        console.error('Failed to load status options:', error);
      }
    };
    fetchStatusOptions();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    const selectedStatus = statusOptions.find(opt => opt.status_name === formState.teststep_status);
    const statusId = selectedStatus ? selectedStatus.status_id : '';

    try {
      await fetch(`http://127.0.0.1:8000/test-step/edit/${testCaseId}/${orderId}?` +
        new URLSearchParams({
          test_step_data: formState.teststep_steps,
          expected_result_data: formState.teststep_expected_result,
          actual_result_data: formState.teststep_actual_result,
          test_step_status: statusId,
        }),
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'x-user-soeid': 'your-soeid-here',
          },
        });

      onSave(formState);
      onClose();
    } catch (err) {
      console.error('Failed to update test step:', err);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
      <DialogTitle sx={{ fontWeight: 600, fontSize: '1.25rem' }}>Edit Test Step</DialogTitle>
      <DialogContent dividers sx={{ display: 'flex', flexDirection: 'column', gap: 3, pt: 3 }}>
        <TextField
          label="Test Step"
          name="teststep_steps"
          value={formState.teststep_steps}
          onChange={handleChange}
          fullWidth
        />
        <TextField
          label="Expected Result"
          name="teststep_expected_result"
          value={formState.teststep_expected_result}
          onChange={handleChange}
          fullWidth
        />
        <TextField
          label="Status"
          name="teststep_status"
          value={formState.teststep_status}
          onChange={handleChange}
          select
          fullWidth
        >
          {statusOptions.map((option) => (
            <MenuItem key={option.status_id} value={option.status_name}>
              {option.status_name}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          label="Actual Result"
          name="teststep_actual_result"
          value={formState.teststep_actual_result}
          onChange={handleChange}
          fullWidth
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSave} variant="contained">Save Changes</Button>
      </DialogActions>
    </Dialog>
  );
}
