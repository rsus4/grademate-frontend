import PropTypes from 'prop-types';
import { useState } from 'react';
import { Select, MenuItem } from '@mui/material';

export const OverviewTotalCustomers = (props) => {
  const { sx } = props;
  const [selection, setSelection] = useState('Winter 2023');

  const handleChange = (event) => {
    props.handleChange(event.target.value)
    setSelection(event.target.value);
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <Select
        sx={{
          width: '300px', // set the width to a fixed value
          ...sx // spread the `sx` prop to override the styles if needed
        }}
        value={selection}
        onChange={handleChange}
        displayEmpty
      >
        <MenuItem value="" disabled>
          Select an option
        </MenuItem>
        {/* <MenuItem value={'Monsoon 2022'}>Monsoon 2022</MenuItem> */}
        <MenuItem value={'Winter 2023'}>Winter 2023</MenuItem>
      </Select>
    </div>
  );
};

OverviewTotalCustomers.propTypes = {
  sx: PropTypes.object
};