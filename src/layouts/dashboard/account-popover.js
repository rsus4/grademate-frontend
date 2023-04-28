import { useCallback, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import PropTypes from 'prop-types';
import { Box, Divider, MenuItem, MenuList, Popover, Typography } from '@mui/material';
import { useAuth } from 'src/hooks/use-auth';

export const AccountPopover = (props) => {
  const { anchorEl, onClose, open } = props;
  const [name, setName] = useState('');
  const router = useRouter();
  const auth = useAuth();

  const handleSignOut = useCallback(
    () => {
      onClose?.();
      // auth.signOut();
      router.push('/auth/login');
    },
    [onClose, auth, router]
  );

  useEffect(() => {
    const fetchData = async () => {
    console.log("PRINTING 1")
    const email = window.sessionStorage.getItem('email');
    console.log("PRINTING EMAIL")
    console.log(email);
    const api_path = `/api/user/${email}`
    console.log(api_path)
     const response = await fetch(`http://localhost:8000/api/user/${email}`);
     console.log(response)
      const data = await response.json();
      console.log(data);
      setName(data.name);
    };
    fetchData();
  }, []);

  return (
    <Popover
      anchorEl={anchorEl}
      anchorOrigin={{
        horizontal: 'left',
        vertical: 'bottom'
      }}
      onClose={onClose}
      open={open}
      PaperProps={{ sx: { width: 200 } }}
    >
      <Box
        sx={{
          py: 1.5,
          px: 2
        }}
      >
        <Typography variant="overline">
          Account
        </Typography>
        <Typography
          color="text.secondary"
          variant="body2"
        >
          {name}
        </Typography>
      </Box>
      <Divider />
      <MenuList
        disablePadding
        dense
        sx={{
          p: '8px',
          '& > *': {
            borderRadius: 1
          }
        }}
      >
        <MenuItem onClick={handleSignOut}>
          Sign out
        </MenuItem>
      </MenuList>
    </Popover>
  );
};

AccountPopover.propTypes = {
  anchorEl: PropTypes.any,
  onClose: PropTypes.func,
  open: PropTypes.bool.isRequired
};
