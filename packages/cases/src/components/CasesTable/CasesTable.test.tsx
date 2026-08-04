import { render, screen, cleanup } from '@testing-library/react';
import { createTheme } from '@mui/material/styles';
import { MemoryRouter } from 'react-router-dom';
import { CasesTable } from './CasesTable';
import { CaseWithAssignee } from '../../types';

const muiTheme = createTheme();

const baseCase: CaseWithAssignee = {
  identifier: 'case-1',
  assignee_id: 'user-1',
  status: 'CASE_NOT_STARTED',
  name: 'Test Case',
  assignee_name: 'Jane Doe',
  assignee_active: true,
};

const renderTable = (cases: CaseWithAssignee[]) =>
  render(
    <MemoryRouter>
      <CasesTable
        cases={cases}
        rowCount={cases.length}
        paginationModel={{ page: 0, pageSize: 25 }}
        onPaginationModelChange={() => {}}
        muiTheme={muiTheme}
      />
    </MemoryRouter>,
  );

describe('CasesTable', () => {
  it('renders the case name as a link to its detail view', () => {
    renderTable([{ ...baseCase, identifier: 'case-42', name: 'Test Case' }]);

    expect(screen.getByRole('link', { name: 'Test Case' })).toHaveAttribute(
      'href',
      '/cases/case-42',
    );
  });

  it('renders the human-readable status label, not the raw enum', () => {
    renderTable([{ ...baseCase, status: 'CASE_RESOLVED_RISK_DETECTED' }]);

    expect(screen.getByText('Risk Detected')).toBeInTheDocument();
    expect(
      screen.queryByText('CASE_RESOLVED_RISK_DETECTED'),
    ).not.toBeInTheDocument();
  });

  it('falls back to the raw status value for an unrecognized status', () => {
    renderTable([{ ...baseCase, status: 'SOME_UNKNOWN_STATUS' }]);

    expect(screen.getByText('SOME_UNKNOWN_STATUS')).toBeInTheDocument();
  });

  it('renders active and inactive assignees with different text colors', () => {
    renderTable([
      {
        ...baseCase,
        identifier: 'case-1',
        assignee_name: 'Active User',
        assignee_active: true,
      },
    ]);
    const activeColor = getComputedStyle(
      screen.getByText('Active User'),
    ).color;
    cleanup();

    renderTable([
      {
        ...baseCase,
        identifier: 'case-2',
        assignee_name: 'Inactive User',
        assignee_active: false,
      },
    ]);
    const inactiveColor = getComputedStyle(
      screen.getByText('Inactive User'),
    ).color;

    expect(activeColor).not.toBe(inactiveColor);
  });
});
