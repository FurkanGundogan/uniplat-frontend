import * as React from 'react';
import Alert from '@mui/material/Alert';

export default function LoginSuccessAlert() {
    return (
        <Alert severity="success" sx={{ width: "100%",marginTop:"12px",fontSize:"16px" }} >
            Login Success!
        </Alert>
    );
}