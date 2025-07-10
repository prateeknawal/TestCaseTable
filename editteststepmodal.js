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

export default function EditTestStepModal({ open, stepData, onClose, onSave }) {
  const [formState, setFormState] = useState({
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
      <DialogTitle sx={{ fontWeight: 600, fontSize: '1.25rem' }}>
        Edit Test Step
      </DialogTitle>

      <DialogContent dividers sx={{ display: 'flex', flexDirection: 'column', gap: 3, pt: 3 }}>
        <Box>
          <Typography variant="subtitle2" gutterBottom>
            Test Step
          </Typography>
          <TextField
            name="teststep_steps"
            value={formState.teststep_steps}
            onChange={handleChange}
            multiline
            rows={3}
            fullWidth
            placeholder="Enter the action/step to be performed"
          />
        </Box>

        <Box>
          <Typography variant="subtitle2" gutterBottom>
            Expected Result
          </Typography>
          <TextField
            name="teststep_expected_result"
            value={formState.teststep_expected_result}
            onChange={handleChange}
            multiline
            rows={3}
            fullWidth
            placeholder="What should happen if the step succeeds?"
          />
        </Box>

        <Box>
          <Typography variant="subtitle2" gutterBottom>
            Actual Result
          </Typography>
          <TextField
            name="teststep_actual_result"
            value={formState.teststep_actual_result}
            onChange={handleChange}
            multiline
            rows={3}
            fullWidth
            placeholder="What actually happened during testing?"
          />
        </Box>

        <Box>
          <Typography variant="subtitle2" gutterBottom>
            Status
          </Typography>
          <TextField
            name="teststep_status"
            value={formState.teststep_status || ''}
            onChange={handleChange}
            select
            fullWidth
          >
            <MenuItem value="Pending">Pending</MenuItem>
            <MenuItem value="Pass">Pass</MenuItem>
            <MenuItem value="Fail">Fail</MenuItem>
          </TextField>
        </Box>
      </DialogContent>

      <DialogActions sx={{ px: 3, py: 2 }}>
        <Button onClick={onClose} variant="text" sx={{ fontWeight: 500 }}>
          Cancel
        </Button>
        <Button onClick={handleSave} variant="contained" sx={{ fontWeight: 500 }}>
          Save Changes
        </Button>
      </DialogActions>
    </Dialog>
  );
}