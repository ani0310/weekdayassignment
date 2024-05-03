import React from 'react'

import Iconify from '../components/Iconify';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';

import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import Divider from '@mui/material/Divider';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import { Button } from '@mui/material';

const JobCard = ({data}) => {
    const {salaryCurrencyCode,maxJdSalary,location,maxExp}=data
  return (
    <Card>
        

    <Stack sx={{ p: 3, pb: 2 }}>
      <Avatar
        alt="/weekday.jpg"
        src="/weekday.jpg"
        variant="rounded"
        sx={{ width: 48, height: 48, mb: 2 }}
      />
   

      <Stack
        spacing={0.5}
        direction="row"
        alignItems="center"
        // sx={{ color: 'primary.main', typography: 'caption' }}
      >
        <Typography  sx={{ mb: 1 }}>
        
        
          
        {data?.jobRole && data.jobRole.charAt(0).toUpperCase() + data.jobRole.slice(1)}

          
        
        </Typography>

      </Stack>

      <Stack
        spacing={0.5}
        direction="row"
        alignItems="center"
        // sx={{ color: 'primary.main', typography: 'caption' }}
      >
        <Typography  sx={{ mb: 1 }}>
        
        
          
        Weekday

          
        
        </Typography>

      </Stack>

      <Stack
        spacing={0.5}
        direction="row"
        alignItems="center"
        // sx={{ color: 'primary.main', typography: 'caption' }}
      >
       
       <Grid container>
  <Typography sx={{ mb: 1, color: 'text.disabled', whiteSpace: 'pre-line', textAlign: 'start' }}>
  {data?.jobDetailsFromCompany?.length > 100 ? `${data.jobDetailsFromCompany.slice(0, 100)}...view more` : data.jobDetailsFromCompany}
  </Typography>
</Grid>

  
      </Stack>


  

    </Stack>
      
    <Divider sx={{ borderStyle: 'dashed' }} />

    <Box rowGap={1.5} display="grid" gridTemplateColumns="repeat(2, 1fr)" sx={{ p: 3 }}>
      {[
        
        {
          label: `${salaryCurrencyCode ?salaryCurrencyCode:'USD'} ${maxJdSalary ?maxJdSalary : "-"} Salary`,
          icon: <Iconify width={16} icon="solar:clock-circle-bold" sx={{ flexShrink: 0 }} />,
        },
        
        {
          label: `${maxExp ?maxExp : "-"} Experience`,
          icon: <Iconify width={16} icon="carbon:user-data" sx={{ flexShrink: 0 }} />,
        },
        {
            label: location,
            icon: <Iconify width={16} icon="carbon:location" sx={{ flexShrink: 0 }} />,
          },
      ].map((item1) => (
        <Stack
          key={item1.label}
          spacing={0.5}
          flexShrink={0}
          direction="row"
          alignItems="center"
          sx={{ minWidth: 0 }}
        >
          {item1.icon}
          <Typography variant="caption" noWrap>
            {item1.label || "--"}
          </Typography>
        </Stack>
      ))}
    </Box>
    <Grid m={2}>
    <Button
        variant="contained"
        sx={{
          width: '100%',
          backgroundColor: '#55EFC4',
          color: 'black',
          '&:hover': {
            backgroundColor: '#FFCC9A', // Brown color on hover
            color: 'white', // White text color on hover
          },
        }}
      >
        Apply Now
      </Button> 
      
      </Grid>
        </Card>
  )
}

export default JobCard