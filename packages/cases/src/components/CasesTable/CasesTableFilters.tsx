import MuiBox from '@mui/material/Box';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { UsersApi } from 'shared';

interface CasesTableFiltersProps {
  assigneeOptions: UsersApi.User[];
  assigneeFilter: string | null;
  onAssigneeFilterChange: (assigneeId: string | null) => void;
  onClearFilters: () => void;
}

export const CasesTableFilters = ({
  assigneeOptions,
  assigneeFilter,
  onAssigneeFilterChange,
  onClearFilters,
}: CasesTableFiltersProps) => {
  const handleAssigneeSelectChange = (event: SelectChangeEvent) => {
    onAssigneeFilterChange(event.target.value || null);
  };

  return (
    <MuiBox
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        gap: 2,
        mb: 2,
      }}
    >
      <FormControl size="small" sx={{ minWidth: 220 }}>
        <InputLabel id="assignee-filter-label">Assignee</InputLabel>
        <Select
          labelId="assignee-filter-label"
          label="Assignee"
          value={assigneeFilter ?? ''}
          onChange={handleAssigneeSelectChange}
        >
          <MenuItem value="">
            <em>All assignees</em>
          </MenuItem>
          {assigneeOptions.map((user) => (
            <MenuItem key={user.identifier} value={user.identifier}>
              {user.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <Button onClick={onClearFilters} disabled={assigneeFilter === null}>
        Clear Filters
      </Button>
    </MuiBox>
  );
};
