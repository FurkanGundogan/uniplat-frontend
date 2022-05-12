import React from 'react'
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

  
export default function ShowMore() {
  
    return (
      <Stack spacing={2} mb={1} sx={{ padding: '10px' }}>
        <Button variant="outlined" size="medium"
        sx={{
            border:"1px solid rgb(79 83 87 / 50%)",
            color:"#6b6e72"
        }}
        >
          SHOW MORE
        </Button>
      </Stack>
    );
  }
