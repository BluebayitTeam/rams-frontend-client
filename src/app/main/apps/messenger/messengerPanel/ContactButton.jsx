import Tooltip from '@mui/material/Tooltip';
import Button from '@mui/material/Button';
import clsx from 'clsx';
import Avatar from '@mui/material/Avatar';
import { styled } from '@mui/material/styles';
import ContactStatus from './ContactStatus';
import { BASE_URL } from 'src/app/constant/constants';

const Root = styled(Tooltip)(({ theme, active }) => ({
  width: 70,
  minWidth: 70,
  flex: '0 0 auto',
  ...(active && {
    '&:after': {
      position: 'absolute',
      top: 8,
      right: 0,
      bottom: 8,
      content: "''",
      width: 4,
      borderTopLeftRadius: 4,
      borderBottomLeftRadius: 4,
      backgroundColor: theme.palette.primary.main,
    },
  }),
}));
const StyledUreadBadge = styled('div')(({ theme }) => ({
  position: 'absolute',
  minWidth: 18,
  height: 18,
  top: 4,
  left: 10,
  borderRadius: 9,
  padding: '0 5px',
  fontSize: 11,
  textAlign: 'center',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: theme.palette.secondary.main,
  color: theme.palette.secondary.contrastText,
  boxShadow: '0 2px 2px 0 rgba(0, 0, 0, 0.35)',
  zIndex: 10,
}));

/**
 * Contact button component.
 */
function ContactButton(props) {
  const { contact, selectedContactId, onClick } = props;

  return (
    <Root
      title={contact.name}
      placement='left'
      active={selectedContactId === contact.id ? 1 : 0}>
      <Button
        onClick={() => onClick(contact.id)}
        className={clsx(
          'contactButton rounded-0 py-4 h-auto min-h-auto max-h-none',
          selectedContactId === contact.id && 'active'
        )}>
        {Boolean(contact.unreadCount) && (
          <StyledUreadBadge>{contact.unreadCount}</StyledUreadBadge>
        )}

        <ContactStatus value={contact.status} />

        <Avatar src={`${BASE_URL}${contact?.image}`} alt={contact.first_name}>
          {!contact.image || contact?.image === ''
            ? contact?.first_name[0]
            : ''}
        </Avatar>
      </Button>
    </Root>
  );
}

export default ContactButton;
