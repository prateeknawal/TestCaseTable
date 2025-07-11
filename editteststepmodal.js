import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogContent
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';

export default function EditTestStepModal({
  open,
  onClose,
  onSave,
  testStep,
  test_case_id,
  order_id,
  userSoeid
}) {
  const [testStepData, setTestStepData] = useState('');
  const [expectedResultData, setExpectedResultData] = useState('');
  const [actualResultData, setActualResultData] = useState('');
  const [statusOptions, setStatusOptions] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState('');

  useEffect(() => {
    if (testStep) {
      setTestStepData(testStep.teststep_steps || '');
      setExpectedResultData(testStep.teststep_expected_result || '');
      setActualResultData(testStep.teststep_actual_result || '');
      setSelectedStatus(testStep.teststep_status || '');
    }
  }, [testStep]);

  useEffect(() => {
    const fetchStatusOptions = async () => {
      try {
        const response = await fetch('/api/test-step/test-step-status');
        const data = await response.json();
        setStatusOptions(data);
      } catch (error) {
        console.error('Failed to fetch test step status options:', error);
      }
    };
    fetchStatusOptions();
  }, []);

  const handleSubmit = async () => {
    const selectedStatusId = statusOptions.find(option => option.test_step_status === selectedStatus)?.id;

    if (!selectedStatusId) {
      alert('Invalid status selected');
      return;
    }

    const params = new URLSearchParams({
      test_step_data: testStepData,
      expected_result_data: expectedResultData,
      actual_result_data: actualResultData,
      test_step_status: selectedStatusId.toString()
    });

    try {
      const response = await fetch(`/api/test-step/edit/${test_case_id}/${order_id}?${params.toString()}`, {
        method: 'POST',
        headers: {
          'x-user-soeid': userSoeid
        }
      });
      if (!response.ok) {
        throw new Error('Failed to update test step');
      }
      const result = await response.json();
      console.log('Update result:', result);
      onSave();
    } catch (error) {
      console.error('Error saving changes:', error);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Edit Test Step</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <Label>Test Step</Label>
            <Textarea
              value={testStepData}
              onChange={(e) => setTestStepData(e.target.value)}
              placeholder="Enter test step"
            />
          </div>
          <div>
            <Label>Expected Result</Label>
            <Textarea
              value={expectedResultData}
              onChange={(e) => setExpectedResultData(e.target.value)}
              placeholder="Enter expected result"
            />
          </div>
          <div>
            <Label>Actual Result</Label>
            <Textarea
              value={actualResultData}
              onChange={(e) => setActualResultData(e.target.value)}
              placeholder="Enter actual result"
            />
          </div>
          <div>
            <Label>Status</Label>
            <select
              className="w-full border rounded p-2"
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
            >
              <option value="">Select status</option>
              {statusOptions.map((status) => (
                <option key={status.id} value={status.test_step_status}>
                  {status.test_step_status}
                </option>
              ))}
            </select>
          </div>
        </div>
        <DialogFooter className="pt-4">
          <Button variant="outline" onClick={onClose}>Cancel</Button>
          <Button onClick={handleSubmit}>Save Changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}