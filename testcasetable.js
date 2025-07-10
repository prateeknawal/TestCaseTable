// TestCaseTable.js (Updated with correct API)
import React, { useState, useEffect, useCallback } from 'react';
import { Box, Grid, CircularProgress } from '@mui/material';
import TestCaseList from './TestCaseList';
import TestCaseDetails from './TestCaseDetails';

export default function TestCaseTable({ selectedUserStory, setTestCasesData }) {
  const [testCases, setTestCases] = useState([]);
  const [selectedTestCase, setSelectedTestCase] = useState(null);
  const [loading, setLoading] = useState(true);

  const refreshTestCases = useCallback(async () => {
    if (!selectedUserStory) return;
    const userStoryId = selectedUserStory.id.split('-').pop();

    try {
      const response = await fetch(
        `http://127.0.0.1:8000/user-stories/${userStoryId}/test-cases`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'x-user-soeid': 'pn03489',
          },
        }
      );

      if (response.status === 404) {
        setTestCases([]);
        setTestCasesData([]);
        return;
      }

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`HTTP error ${response.status}: ${errorText}`);
      }

      const data = await response.json();
      console.log('Fetched test cases data from API:', data);

      const testCases = data.test_cases ?? [];

      // Group by testcase_id (one entry per unique test case)
      const groupedMap = new Map();

      for (const tc of testCases) {
        const id = tc['testcase_id'];
        if (!groupedMap.has(id)) {
          groupedMap.set(id, {
            id: id || testCases.indexOf(tc),
            created_by: tc['test_case_creator'],
            created_at: tc['testcase_created_at'],
            description: tc['testcase_description'],
            test_case_id: id,
            priority: tc['testcase_priority'],
            status: tc['testcase_status'],
            title: tc['testcase_title'] || `Untitled Test Case ${testCases.indexOf(tc) + 1}`,
            test_case_type: tc['testcase_type'],
            test_step_actual_result: tc['teststep_actual_result'],
            expected_result: tc['teststep_expected_result'],
            test_step_status: tc['teststep_status'],
            test_step_steps: tc['teststep_steps'],
            llm_name: tc['LLM Name'],
            action_name: tc['Action Name'],
            current_iteration_id: tc['Current Iteration ID'],
            user_prompt: tc['User Prompt'],
          });
        }
      }

      const uniqueTestCases = Array.from(groupedMap.values());

      setTestCasesData(uniqueTestCases);
    } catch (error) {
      if (!error.message.includes('404')) {
        console.error('Error fetching test cases:', error.message);
      }
    } finally {
      setLoading(false);
    }
  }, [selectedUserStory, setTestCasesData]);

  useEffect(() => {
    refreshTestCases();
  }, [refreshTestCases]);

  useEffect(() => {
    refreshTestCases();
  }, [refreshTestCases]);

  const handleRowClick = (params) => {
    const selected = testCases.find(tc => tc.id === params.row.id);
    setSelectedTestCase(selected);
  };

  return (
    <Box p={2}>
      <Grid container spacing={2}>
        <Grid item xs={4}>
          {loading ? (
            <CircularProgress />
          ) : (
            <TestCaseList testCases={testCases} onRowClick={handleRowClick} />
          )}
        </Grid>
        <Grid item xs={8}>
          {selectedTestCase ? (
            <TestCaseDetails testCase={selectedTestCase} />
          ) : (
            <Box>Select a test case to view its steps</Box>
          )}
        </Grid>
      </Grid>
    </Box>
  );
};