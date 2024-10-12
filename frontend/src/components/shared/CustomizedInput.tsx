import { TextField } from '@mui/material';
import React from 'react'

type Props = {
    name: string;
    type: string;
    label: string;
};

const CustomizedInput = (props: Props) => {
    const {
        name,
        type,
        label
    } = props;
  return (
    <TextField 
        {...{
            name,
            type,
            label
        }}
        InputLabelProps={{
            style: {
                color: "white"
            }
        }}
        margin='normal'
        InputProps={{
            style: {
                width: '400px',
                borderRadius: '10px',
                fontSize: '20px',
                color: "#fff"
            }
        }}
    />
  )
}

export default CustomizedInput