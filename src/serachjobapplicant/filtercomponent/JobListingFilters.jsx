import React, { useEffect, useState,useCallback } from 'react';
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
import { InputAdornment } from '@mui/material';
import JobCard from '../jobcard/JobCard';


import { useSelector, useDispatch } from 'react-redux'


// import companyLogo from "searchjob/public/weekday.jpg"

const data = {
  experienceOptions: [{ label: '2', id: 2 },{ label: '3', id: 3 },{ label: '1', id: 1 },{ label: '4', id: 4 },{ label: '5', id: 5 },{ label: '6', id: 6 },{ label: '7', id: 7 },{ label: '8', id: 8 },{ label: '9', id: 9 },{ label: '10', id: 10 },{ label: '11', id: 11 },{ label: '12', id: 12 }],
  company: [{ label: 'Google', id: 1 }, { label: 'Microsoft', id: 2 }],
  locations:[{ label: 'bangalore', id: 1 }, { label: 'hyderabad', id: 2 },{ label: 'delhi ncr', id: 3 },{ label: 'mumbai', id: 4 },{ label: 'remote', id: 1 },{ label: 'chennai', id: 1 }],
  remote:[{ label: 'Remote', id: 1 }, { label: 'Hybrid', id: 2 },{ label: 'In-Office', id: 3}],
  techstack:[],
  
};



const JobListingFilters = () => {
  

 
   
   const showData = useSelector((state) => state?.data || []);
   const [isLoading, setIsLoading] = useState(false)
   const [selectedExperience, setSelectedExperience] = useState(null);
   const [selectedCompany, setSelectedCompany] = useState([]);
   const [selectedLocations, setSelectedLocations] = useState([]);
   const [selectedremote, setSelectedRemote] = useState([]);
   const [selectedMinbasepay, setSelectedMinbasepay] = useState("");
   const [selectedMinExp, setSelectedMinExp] = useState("");
   const [filteredData, setFilteredData] = useState(useSelector((state) => state?.data || []));
   
  // intially load for the data
   useEffect(()=>{
    if(showData && showData?.length>0){
      
      //setFilteredData(showData)
      console.log(showData,'1')
      filterData(selectedExperience, selectedCompany, selectedLocations,selectedMinbasepay,selectedMinExp);
    }
   },[showData])


   // fetc data on scroll

 


   // handlers

  const handleExperienceChange = (event, newValue) => {
    setSelectedExperience(newValue);
    filterData(newValue, selectedCompany, selectedLocations,selectedMinbasepay,selectedMinExp);
  };

  const handleCompanyChange = (event, newValue) => {
    setSelectedCompany(newValue);
    filterData(selectedExperience, newValue, selectedLocations,selectedMinbasepay,selectedMinExp);
  };
  const handleLocationChange = (event, newValues) => {
    setSelectedLocations(newValues);
    filterData(selectedExperience, selectedCompany, newValues,selectedMinbasepay,selectedMinExp);
  };

  const handleMinbasepay = (event) => {
    setSelectedMinbasepay(parseInt(event.target.value));
    filterData(selectedExperience, selectedCompany, selectedLocations,event.target.value,selectedMinExp);
  };
  const handleMinExp = (event) => {
    setSelectedMinExp(parseInt(event.target.value));
    filterData(selectedExperience, selectedCompany, selectedLocations,selectedMinbasepay,event.target.value);
  };

  const handleRemoteChange = (newValue) => {
    setSelectedRemote(newValue);
    filterData(selectedExperience, selectedCompany, selectedLocations,newValue);
  };


  // filterfunction

  const filterData = (selectedExperience, selectedCompanies,selectedLocations,selectedMinbasepay,selectedMinExp) => {
    let filtered = showData

    if (selectedExperience && selectedExperience) {
      filtered = filtered.filter(item => item.maxExp === parseInt(selectedExperience.label));
    }

    if (selectedCompanies && selectedCompanies.length > 0) {
        
      filtered = filtered.filter(item => selectedCompanies?.some(company => company.label === item.company));
    }

    if (selectedLocations.length > 0) {
        filtered = filtered.filter(item => selectedLocations?.some(location => location.label === item.location));
      }
      if (selectedMinbasepay) {
        filtered = filtered.filter(item => {
            if (item.minJdSalary !== null) {
                return item.maxJdSalary >= parseInt(selectedMinbasepay);
            } else {
                return false; // Keep the record if minJdSalary is not defined
            }
        });
    }
    if (selectedMinExp) {
        filtered = filtered.filter(item => {
            if (item.minExp !== null) {
                return item.maxExp >= parseInt(selectedMinExp);
            } else {
                return false; // Keep the record if minJdSalary is not defined
            }
        });
    }

    setFilteredData(filtered);
  };

  return (
    <div>
         <Box
        m={2}
        gap={3}
        display="grid"
        gridTemplateColumns={{
          xs: 'repeat(1, 1fr)',
          sm: 'repeat(3, 1fr)',
          md: 'repeat(5, 1fr)',
        } }>


      {/* <Autocomplete
        disablePortal
        size="small"
        id="experience-combo-box"
        options={data.experienceOptions}
        getOptionLabel={(option) => option.label}
        
        renderInput={(params) => <TextField {...params} label="Experience" />}
        onChange={handleExperienceChange}
      /> */}

<Autocomplete
       
        size="small"
        id="company-combo-box"
        options={data.locations}
        getOptionLabel={(option) => option.label}
        
        renderInput={(params) => <TextField {...params} label="Location" />}
        onChange={handleLocationChange}
        multiple
      />
 


<TextField
       
       size="small"
       id="company-combo-box"
       
       
      label="Min Base Pay"
      placeholder='Enter the base pay'
       onChange={handleMinbasepay}
      type="number"
      InputProps={{
        endAdornment: <InputAdornment position="end">LPA</InputAdornment>,
      }}
     />
     <TextField
       
       size="small"
       id="company-combo-box"
       
       
      label="Min Experience"
      placeholder='Enter the minimum Exp'
       onChange={handleMinExp}
      type="number"
      InputProps={{
        endAdornment: <InputAdornment position="end">Years</InputAdornment>,
      }}
     />
     </Box>

      <>
        <h2>Jobs</h2>
       { showData &&  <Box
        m={2}
        gap={3}
        display="grid"
        gridTemplateColumns={{
          xs: 'repeat(1, 1fr)',
          sm: 'repeat(2, 1fr)',
          md: 'repeat(4, 1fr)',
        }}
      >
       
          {filteredData.map((item, index) => (

            <JobCard data={item} />
            
           
          ))}
          </Box>}
        
      </>
    </div>
  );
};

export default JobListingFilters;
