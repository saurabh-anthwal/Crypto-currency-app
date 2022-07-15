import { AppBar, MenuItem, Select, Toolbar, Typography, InputLabel, FormControl } from '@mui/material'
import { Container } from '@mui/system';
import React from 'react';
import { useNavigate } from "react-router-dom";
import { CryptoState } from '../CryptoContext';

const Navbar = () => {
  const navigate = useNavigate()

  const { currency, setCurrency } = CryptoState()
  console.log(currency)
  return (
    <div>
      <AppBar color="transparent" position="static" sx={{paddingTop:1}} >
        <Container>
          <Toolbar style={{display:"flex",justifyContent:"space-between"}}>
            <Typography color="gold" variant="h5" fontWeight="800" letterSpacing="0.0075em" sx={{ cursor: "pointer" }} onClick={() => navigate("/")}>
              Crypto Hunter
            </Typography>
            <FormControl >
              {/* <InputLabel id="demo-simple-select-standard-label" sx={{ color: "white", }} >Currency</InputLabel> */}
              <Select sx={{ mr:4, minWidth: 100,color:"gold", border:"1px solid gray"}} size="small" value={currency} onChange={(e) => setCurrency(e.target.value)}>
                <MenuItem value={"USD"}>USD</MenuItem>
                <MenuItem value={"INR"}>INR</MenuItem>
              </Select>
            </FormControl>
          </Toolbar>
        </Container>
      </AppBar>
    </div>
  )
}

export default Navbar