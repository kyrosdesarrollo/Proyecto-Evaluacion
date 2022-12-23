// import React from 'react'

// export const EjecutivoToolbar = () => {
//   return (
//     <div>ejecutivo-toolbar</div>
//   )
// }

import * as React from 'react';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';

export const EjecutivoToolbar = () => {
  return (
    <Stack direction="row" spacing={2}>
      <Button variant="contained">Contained</Button>
      <Button variant="contained" disabled>
        Disabled
      </Button>
      <Button variant="contained" href="#contained-buttons">
        Link
      </Button>
    </Stack>
  );
}
