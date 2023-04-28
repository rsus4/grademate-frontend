import PropTypes from 'prop-types';
import { useState } from 'react';
import { Select, MenuItem } from '@mui/material';

export const OverviewBudget = (props) => {
  const { sx, data } = props;
  const [selection, setSelection] = useState('');

  const handleChange = (event) => {
    props.handleChange(event.target.value)
    setSelection(event.target.value);
  };

  return (
    // console.log(data),
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <Select
        sx={{
          width: '300px', // set the width to a fixed value
          height:'100%',
          ...sx // spread the `sx` prop to override the styles if needed
        }}
        value={selection}
        onChange={handleChange}
        displayEmpty
      >
        <MenuItem value="" disabled>
          Select an option
        </MenuItem>
        {data && data.map((item)=>{
           return <MenuItem value={item}>{item}</MenuItem>
        })}
      </Select>
    </div>
  );
};

OverviewBudget.propTypes = {
  sx: PropTypes.object
};