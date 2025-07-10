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
  Box
} from '@mui/material';

export default function EditTestStepModal({ open, stepData, onClose, onSave }) {
  const [formState, setFormState] = useState({
    teststep_orderid: '',
    teststep_steps: '',
    teststep_expected_result: '',
    teststep_actual_result: '',
    teststep_status: ''
  });

  useEffect(() => {
    if (stepData) {
      setFormState({ ...stepData });
    }
  }, [stepData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSave = () => {
    onSave(formState);
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
      <DialogTitle>Edit Test Step</DialogTitle>
      <DialogContent>
        <Box display="flex" flexDirection="column" gap={2} mt={1}>
          <TextField
            label="Test Step"
            name="teststep_steps"
            value={formState.teststep_steps}
            onChange={handleChange}
            fullWidth
            multiline
            rows={2}
          />
          <TextField
            label="Expected Result"
            name="teststep_expected_result"
            value={formState.teststep_expected_result}
            onChange={handleChange}
            fullWidth
            multiline
            rows={2}
          />
          <TextField
            label="Actual Result"
            name="teststep_actual_result"
            value={formState.teststep_actual_result}
            onChange={handleChange}
            fullWidth
            multiline
            rows={2}
          />
          <TextField
            label="Status"
            name="teststep_status"
            value={formState.teststep_status || ''}
            onChange={handleChange}
            fullWidth
            select
          >
            <MenuItem value="Pending">Pending</MenuItem>
            <MenuItem value="Pass">Pass</MenuItem>
            <MenuItem value="Fail">Fail</MenuItem>
          </TextField>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} variant="outlined">Cancel</Button>
        <Button onClick={handleSave} variant="contained" color="primary">Save</Button>
      </DialogActions>
    </Dialog>
  );
}