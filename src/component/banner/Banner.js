
import { Typography } from '@mui/material';
import { Container } from '@mui/system';
import React from 'react';
import  "./Banner.css";
import Carousel from './Carousel';


const Banner = () => {
  return (
    <div >
        <Container className="banner-img">
            <div>
            <Typography variant="h2" style={{fontWeight:"bold",fontFamily:"Monstserract"}}>
                Crypto Hunter
            </Typography>
            <Typography variant="subtitle2" style={{color:"darkgrey",textTransform:"capitalize",fontFamily:"Montserract"}}>
                Get all the Info regarding your favorite Crypto Currency
            </Typography>
            </div>
            <Carousel/>
        </Container>
    </div>
  )
}

export default Banner