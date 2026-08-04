import { SvgIconComponent } from '@mui/icons-material';
import BlockIcon from '@mui/icons-material/Block';
import DoneIcon from '@mui/icons-material/Done';
import NotStartedIcon from '@mui/icons-material/NotStarted';
import PauseIcon from '@mui/icons-material/Pause';
import PendingOutlinedIcon from '@mui/icons-material/PendingOutlined';

export const STATUS_LABELS: Record<string, string> = {
  CASE_NOT_STARTED: 'Not Started',
  CASE_IN_PROGRESS: 'In Progress',
  CASE_ON_HOLD: 'On Hold',
  CASE_RESOLVED_NO_RISK_DETECTED: 'Resolved',
  CASE_RESOLVED_RISK_DETECTED: 'Risk Detected',
};

export const STATUS_COLORS: Record<string, string> = {
  CASE_NOT_STARTED: 'primary.light',
  CASE_IN_PROGRESS: 'secondary.main',
  CASE_ON_HOLD: 'warning.main',
  CASE_RESOLVED_NO_RISK_DETECTED: 'success.main',
  CASE_RESOLVED_RISK_DETECTED: 'error.main',
};

export const STATUS_ICONS: Record<string, SvgIconComponent> = {
  CASE_NOT_STARTED: NotStartedIcon,
  CASE_IN_PROGRESS: PendingOutlinedIcon,
  CASE_ON_HOLD: PauseIcon,
  CASE_RESOLVED_NO_RISK_DETECTED: DoneIcon,
  CASE_RESOLVED_RISK_DETECTED: BlockIcon,
};
