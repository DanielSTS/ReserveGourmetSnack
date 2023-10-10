import { Snackbar, Alert } from '@mui/material';

type AlertMessageType = {
  open: boolean;
  severity: 'success' | 'error';
  message: string;
  onClose: () => void;
};

export default function AlertMessage({
  open,
  severity,
  message,
  onClose
}: AlertMessageType) {
  return (
    <Snackbar open={open} autoHideDuration={3000} onClose={onClose}>
      <Alert severity={severity} onClose={onClose}>
        {message}
      </Alert>
    </Snackbar>
  );
}
