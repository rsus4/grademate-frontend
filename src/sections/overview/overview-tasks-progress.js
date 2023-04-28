import PropTypes from 'prop-types';
import { Button, Box } from '@mui/material';

export const OverviewTasksProgress = (props) => {
  const { sx, handleSelect } = props;

  return (
    <Box sx={{ padding: 0 }}>
      <Button variant="contained" onClick={handleSelect} color="primary" sx={{ marginTop: '8px', ...sx }}>
        + Add New Curve
      </Button>
    </Box>
  );
};

OverviewTasksProgress.propTypes = {
  sx: PropTypes.object
};