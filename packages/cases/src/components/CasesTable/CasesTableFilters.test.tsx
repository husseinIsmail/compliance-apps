import { render, screen, fireEvent } from '@testing-library/react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { CasesTableFilters } from './CasesTableFilters';
import { UsersApi } from 'shared';

const muiTheme = createTheme();

const assigneeOptions: UsersApi.User[] = [
  { identifier: 'user-1', name: 'Alice', active: true },
  { identifier: 'user-2', name: 'Bob', active: true },
];

const renderFilters = (
  props: Partial<
    React.ComponentProps<typeof CasesTableFilters>
  > = {},
) => {
  const onAssigneeFilterChange = vi.fn();
  const onClearFilters = vi.fn();

  render(
    <ThemeProvider theme={muiTheme}>
      <CasesTableFilters
        assigneeOptions={assigneeOptions}
        assigneeFilter={null}
        onAssigneeFilterChange={onAssigneeFilterChange}
        onClearFilters={onClearFilters}
        {...props}
      />
    </ThemeProvider>,
  );

  return { onAssigneeFilterChange, onClearFilters };
};

describe('CasesTableFilters', () => {
  it('calls onAssigneeFilterChange with the selected assignee id', () => {
    const { onAssigneeFilterChange } = renderFilters();

    fireEvent.mouseDown(screen.getByRole('combobox'));
    fireEvent.click(screen.getByRole('option', { name: 'Alice' }));

    expect(onAssigneeFilterChange).toHaveBeenCalledWith('user-1');
  });

  it('calls onClearFilters when Clear Filters is clicked', () => {
    const { onClearFilters } = renderFilters({ assigneeFilter: 'user-1' });

    fireEvent.click(screen.getByRole('button', { name: 'Clear Filters' }));

    expect(onClearFilters).toHaveBeenCalledTimes(1);
  });

  it('disables the Clear Filters button when no filter is active', () => {
    renderFilters({ assigneeFilter: null });

    expect(
      screen.getByRole('button', { name: 'Clear Filters' }),
    ).toBeDisabled();
  });

  it('enables the Clear Filters button when a filter is active', () => {
    renderFilters({ assigneeFilter: 'user-1' });

    expect(
      screen.getByRole('button', { name: 'Clear Filters' }),
    ).toBeEnabled();
  });
});
