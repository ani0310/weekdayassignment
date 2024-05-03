import React, { useEffect, useState,useCallback } from 'react';
import JobListingFilters from './filtercomponent/JobListingFilters';
import { useSelector, useDispatch } from 'react-redux';
import { AddJobs } from './redux/joblistslice';
import AddJobsOnScroll from './redux/joblistslice';
import { CircularProgress } from '@mui/material';

const ViewJobs = () => {
  const dispatch = useDispatch();
  const [jobData,setJobData]=useState(false);
  const [isLoading, setIsLoading] = useState(false)
  const [index, setIndex] = useState(10);
  
// intially load
  useEffect(() => {
    if (!jobData) {
      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      const body = JSON.stringify({
        "limit": index,
        "offset": 0
      });
      const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: body
      };

      fetch("https://api.weekday.technology/adhoc/getSampleJdJSON", requestOptions)
        .then((response) => response.text())
        .then((result) => {
          const parsedResult = JSON.parse(result);
          
          dispatch(AddJobs(parsedResult.jdList));
  
         setIndex(prev=>prev+10);
          setJobData(true)
        })
        .catch((error) => console.error(error));
       setJobData(true)
    }
  }, [dispatch, jobData]);


  // fetch data on scroll

  
  const fetchData = useCallback(async () => {
    if (isLoading) return;

    setIsLoading(true);

    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    const body = JSON.stringify({
      "limit": index,
      "offset": 0
    });
    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: body
    };

    fetch("https://api.weekday.technology/adhoc/getSampleJdJSON", requestOptions)
      .then((response) => response.text())
      .then((result) => {
        const parsedResult = JSON.parse(result);
        
        dispatch(AddJobs(parsedResult.jdList));
        setIndex(prev=>prev+10);
        setIsLoading(false);
        setJobData(true)
      })
      .catch((error) => {console.error(error);setIsLoading(false);});
   

    
  }, [index, isLoading]);

  // scroll functionality

  useEffect(() => {
    const handleScroll = () => {
      const { scrollTop, clientHeight, scrollHeight } =
        document.documentElement;
      if (scrollTop + clientHeight >= scrollHeight - 20) {
        fetchData();
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [fetchData]);



  

  return (
    <div>
      
      {jobData && <JobListingFilters />}
      {isLoading &&  <CircularProgress />}
     
    </div>
  );
};




export default ViewJobs