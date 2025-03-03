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
          {
            '!bg-green-500 text-white': variant === 'success', // Lighter green
            '!bg-blue-500 text-white': variant === 'info',
            '!bg-red-500 text-white': variant === 'error',
            '!bg-orange-500 text-white': variant === 'warning',
          },
          className
        )}
        style={{
          backgroundColor:
            variant === 'success'
              ? '#10B981' // Custom green
              : variant === 'info'
                ? '#3B82F6' // Custom blue
                : variant === 'error'
                  ? '#EF4444' // Custom red
                  : variant === 'warning'
                    ? '#F97316' // Custom orange
                    : '',
        }}
        elevation={0}
        component={item.useRouter ? NavLinkAdapter : 'div'}
        to={item.link || ''}
        onClick={() => {
          if (item.key === 'MEDICAL' && item.value > 0) {
            navigate('/apps/medicalExpiresReport/medicalExpiresReports/');
          } else if (item.key === 'VISA' && item.value > 0) {
            navigate('/apps/visaExpairsReport/visaExpairsReports');
          } else if (item.key === 'PASSPORT' && item.value > 0) {
            navigate('/apps/passportExpireReport/passportExpireReports');
          }
        }}
        role={item.link ? 'button' : undefined}>
        <div className='flex flex-auto flex-row justify-between items-center w-full'>
          <Typography className='line-clamp-1 font-bold text-lg'>
            {item.key}
          </Typography>
          <span
            className={clsx('font-bold text-lg', {
              'text-green-200': variant === 'success',
              'text-blue-200': variant === 'info',
              'text-red-200': variant === 'error',
              'text-orange-200': variant === 'warning',
            })}>
            {item.value}
          </span>
        </div>
      </Card>
    )
  );
}

export default NotificationCard;
