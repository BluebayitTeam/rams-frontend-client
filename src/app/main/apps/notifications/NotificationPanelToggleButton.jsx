import Badge from '@mui/material/Badge';
import IconButton from '@mui/material/IconButton';
import { useAppDispatch } from 'app/store/store';
import FuseSvgIcon from '@fuse/core/FuseSvgIcon';
import withReducer from 'app/store/withReducer';
import { toggleNotificationPanel } from './store/stateSlice';
import reducer from './store';
import { useGetAllNotificationsQuery } from './NotificationApi';

/**
 * The notification panel toggle button.
 */
function NotificationPanelToggleButton(props) {
  const { children = <FuseSvgIcon>heroicons-outline:bell</FuseSvgIcon> } =
    props;
  const { data: notifications } = useGetAllNotificationsQuery();
  const dispatch = useAppDispatch();
  return (
    <IconButton
      className='h-40 w-40'
      onClick={() => dispatch(toggleNotificationPanel())}
      size='large'>
      <Badge color='secondary' invisible={notifications?.length === 0}>
        {children}
      </Badge>
      <span class='absolute inset-0 object-right-top -mr-6'>
        <button
          type='button'
          class=' ml-16 inline-block px-3 py-2 bg-blue-200  font-medium text-xs leading-tight uppercase rounded-full '>
          {notifications?.total_count ? notifications?.total_count : 0}
        </button>
      </span>
    </IconButton>
  );
}

export default withReducer(
  'notificationPanel',
  reducer
)(NotificationPanelToggleButton);
