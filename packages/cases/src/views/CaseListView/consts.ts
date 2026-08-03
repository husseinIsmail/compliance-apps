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
  CASE_ON_HOLD: 'primary.dark',
  CASE_RESOLVED_NO_RISK_DETECTED: 'success.main',
  CASE_RESOLVED_RISK_DETECTED: 'error.main',
};
