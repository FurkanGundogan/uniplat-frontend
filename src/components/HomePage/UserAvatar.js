import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';

export default function UserAvatar() {
  return (
    <Stack direction="row" sx={{justifyContent:"center"}} mt={2}>
      <Avatar
        alt="Remy Sharp"
        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTqjYWb_kZ7jZ_aCJJdFjLqxS-DBaGsJGxopg&usqp=CAU"
        sx={{ width: 100, height: 100 }}
      />
    </Stack>
  );
}