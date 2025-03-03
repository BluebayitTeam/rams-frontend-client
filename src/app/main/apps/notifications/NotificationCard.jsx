import Card from '@mui/material/Card';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import clsx from 'clsx';
import FuseSvgIcon from '@fuse/core/FuseSvgIcon';
import NavLinkAdapter from '@fuse/core/NavLinkAdapter';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';
import { useNavigate } from 'react-router';

/**
 * The notification card.
 */
function NotificationCard(props) {
  const { item, className, onClose } = props;
  const navigate = useNavigate();

  const variant = item?.variant || '';
  const handleClose = (ev) => {
    ev.preventDefault();
    ev.stopPropagation();

    if (onClose) {
      onClose(item?.id);
    }
  };

  console.log('checkteam', item);

  return (
    item.key !== 'total_count' && (
      <Card
        className={clsx(
          'relative flex min-h-64 w-full items-center space-x-8 rounded-16 p-20 shadow',
          variant === 'success' && 'bg-green-600 text-white', // green background, white text
          variant === 'info' && 'bg-blue-700 text-white', // blue background, white text
          variant === 'error' && 'bg-red-600 text-white', // red background, white text
          variant === 'warning' && 'bg-orange-600 text-white', // orange background, white text
          className
        )}
        elevation={0}
        component={item.useRouter ? NavLinkAdapter : 'div'}
        to={item.link || ''}
        onClick={() => {
          if (item.key === 'MEDICAL' && item.value > 0) {
            navigate('/apps/medicalExpiresReport/medicalExpiresReports/'); // Navigate when key is 'MEDICAL'
          } else if (item.key === 'VISA') {
            navigate(
              '/apps/visaExpireReport/visaExpireReports/15' && item.value > 0
            ); // Navigate when key is 'MEDICAL'
          } else if (item.key === 'PASSPORT' && item.value > 0) {
            navigate('/apps/passportExpireReport/passportExpireReports'); // Navigate when key is 'MEDICAL'
          }
        }}
        role={item.link && 'button'}>
        <div className='flex flex-auto flex-row'>
          <Typography
            className={clsx(
              'line-clamp-1 font-semibold',
              variant === 'success' && 'text-white', // white text for success
              variant === 'info' && 'text-white', // white text for info
              variant === 'error' && 'text-white', // white text for error
              variant === 'warning' && 'text-white' // white text for warning
            )}>
            {item.key}
          </Typography>
          <span
            className={clsx(
              'ml-[150px]',
              variant === 'success' && 'text-green-600', // green text for success
              variant === 'info' && 'text-blue-700', // blue text for info
              variant === 'error' && 'text-red-600', // red text for error
              variant === 'warning' && 'text-orange-600' // orange text for warning
            )}>
            {item.value}
          </span>
        </div>
      </Card>
    )
  );
}

export default NotificationCard;
