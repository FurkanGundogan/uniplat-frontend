import React from 'react'
import Stack from '@mui/material/Stack';
import MuiAlert from '@mui/material/Alert';

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });
  
export default function NoPosts() {
  
    return (
      <Stack spacing={2} mb={2} sx={{ width: '100%' }}>
        <Alert severity="info">Start interactions at Uniplat to see posts</Alert>
      </Stack>
    );
  }
