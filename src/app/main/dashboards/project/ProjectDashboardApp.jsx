import FusePageSimple from '@fuse/core/FusePageSimple';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import { useState } from 'react';
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import FuseLoading from '@fuse/core/FuseLoading';
import HomeTab from './home/HomeTab';

const Root = styled(FusePageSimple)(({ theme }) => ({
  '& .FusePageSimple-header': {
    backgroundColor: theme.palette.background.paper,
    boxShadow: `inset 0 0 0 1px  ${theme.palette.divider}`,
  },
}));

/**
 * The ProjectDashboardApp page.
 */
function ProjectDashboardApp() {
  const [tabValue, setTabValue] = useState(0);

  function handleChangeTab(event, value) {
    setTabValue(value);
  }

  return (
    <Root
      content={
        <div className='w-full p-12 pt-16 sm:pt-24 lg:ltr:pr-0 lg:rtl:pl-0'>
          {<HomeTab />}
        </div>
      }
    />
  );
}

export default ProjectDashboardApp;
