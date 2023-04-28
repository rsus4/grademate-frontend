import PropTypes from 'prop-types';
import { Button, Box } from '@mui/material';

export const OverviewTotalProfit = (props) => {
  const { sx } = props;

  return (
    <Box sx={{ padding: 0 }}>
      {/* <Button variant="contained" color="primary" sx={{ marginTop: '8px', ...sx }}>
        Add New Task
      </Button> */}
    </Box>
  );
};

OverviewTotalProfit.propTypes = {
  sx: PropTypes.object
};