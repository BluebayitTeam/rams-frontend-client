import FuseScrollbars from '@fuse/core/FuseScrollbars';
import { styled } from '@mui/material/styles';
import clsx from 'clsx';
import { memo } from 'react';
import Navigation from 'app/theme-layouts/shared-components/navigation/Navigation';
import NavbarToggleButton from 'app/theme-layouts/shared-components/navbar/NavbarToggleButton';
import Logo from '../../../../shared-components/Logo';
import UserNavbarHeader from '../../../../shared-components/UserNavbarHeader';
import { makeStyles } from '@mui/styles';
import { AppBar } from '@mui/material';
import { useTheme } from '@emotion/react';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.default,
    color: theme.palette.text.primary,
    '& ::-webkit-scrollbar-thumb': {
      boxShadow: `inset 0 0 0 20px ${
        theme.palette.type === 'light'
          ? 'rgba(0, 0, 0, 0.24)'
          : 'rgba(255, 255, 255, 0.24)'
      }`,
    },
    '& ::-webkit-scrollbar-thumb:active': {
      boxShadow: `inset 0 0 0 20px ${
        theme.palette.type === 'light'
          ? 'rgba(0, 0, 0, 0.37)'
          : 'rgba(255, 255, 255, 0.37)'
      }`,
    },
  },
  content: {
    overscrollBehavior: 'contain',
    overflowX: 'hidden',
    overflowY: 'auto',
    '-webkit-overflow-scrolling': 'touch',
    background:
      'linear-gradient(rgba(0, 0, 0, 0) 30%, rgba(0, 0, 0, 0) 30%), linear-gradient(rgba(0, 0, 0, 0.25) 0, rgba(0, 0, 0, 0) 40%)',
    backgroundRepeat: 'no-repeat',
    backgroundSize: '100% 40px, 100% 10px',
    backgroundAttachment: 'local, scroll',
  },
}));

/**
 * The navbar style 1 content.
 */
function NavbarStyle1Content(props) {
  const classes = useStyles();
  const theme = useTheme();
  return (
    <div
      className={clsx(
        'flex flex-auto flex-col overflow-hidden h-full',
        classes.root,
        props.className
      )}>
      <AppBar
        color='primary'
        position='static'
        className='flex flex-row items-center flex-shrink h-48 md:h-64 min-h-48 md:min-h-64 px-12 shadow-0'>
        <div className='flex flex-1 mx-4'>
          <Logo />
        </div>

        <NavbarToggleButton className='w-40 h-40 p-0' />
      </AppBar>

      <FuseScrollbars
        className={clsx(classes.content)}
        option={{ suppressScrollX: true, wheelPropagation: false }}>
        <UserNavbarHeader />

        <Navigation layout='vertical' />
      </FuseScrollbars>
    </div>
  );
}

export default memo(NavbarStyle1Content);
