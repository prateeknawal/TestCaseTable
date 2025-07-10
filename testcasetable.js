'use client';

import React, { useCallback, useEffect, useState } from 'react';
import { Box, Stack, Paper } from '@mui/material';
import TestCaseList from './TestCaseList';
import TestCaseDetails from './TestCaseDetails';

export default function TestCaseTable({ selectedUserStory, setTestCasesData }) {
  const [testCases, setTestCases] = useState([]);
  const [selectedTestCase, setSelectedTestCase] = useState(null);
  const [loading, setLoading] = useState(false);

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
      const list = data.test_cases ?? [];

      // Group test steps under unique test case IDs
      const groupedTestCases = Object.values(
        list.reduce((acc, tc, index) => {
          const id = tc['testcase_id'];
          if (!acc[id]) {
            acc[id] = {
              id,
              created_by: tc['test_case_creator'],
              created_at: tc['testcase_created_at'],
              description: tc['testcase_description'],
              test_case_id: id,
              priority: tc['testcase_priority'],
              status: tc['testcase_status'],
              title: tc['testcase_title'] || `Untitled Test Case ${index + 1}`,
              test_case_type: tc['testcase_type'],
              llm_name: tc['LLM Name'],
              action_name: tc['Action Name'],
              current_iteration_id: tc['Current Iteration ID'],
              user_prompt: tc['User Prompt'],
              test_steps: [],
            };
          }

          acc[id].test_steps.push({
            step: tc['teststep_steps'],
            expected_result: tc['teststep_expected_result'],
            actual_result: tc['teststep_actual_result'],
            status: tc['teststep_status'],
          });

          return acc;
        }, {})
      );

      setTestCases(groupedTestCases);
      setTestCasesData(groupedTestCases);
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

  const handleRowClick = (params) => {
    const selected = testCases.find((tc) => tc.id === params.row.id);
    setSelectedTestCase(selected);
  };


  
  return (
    <Box sx={{ width: '100%', p: 2 }}>
      <Stack direction="row" spacing={2} alignItems="flex-start" sx={{ flexWrap: 'wrap' }}>
        {/* Left: Test Case List */}
        <Paper
          elevation={1}
          sx={{
            flex: 1,
            minWidth: 500,
            maxWidth: '48%',
            overflowX: 'auto',
          }}
        >
          <TestCaseList
            testCases={testCases}
            onRowClick={handleRowClick}
            selectedRowId={selectedTestCase?.id}
          />
        </Paper>

        {/* Right: Test Case Details */}
        <Paper
          elevation={1}
          sx={{
            flex: 1,
            minWidth: 500,
            maxWidth: '48%',
            overflowX: 'auto',
            height: 'auto', // dynamic height
          }}
        >
          {selectedTestCase ? (
            <TestCaseDetails testCase={selectedTestCase} />
          ) : (
            <Box sx={{ p: 2 }}>Select a test case to view its steps.</Box>
          )}
        </Paper>
      </Stack>
    </Box>
  );
}