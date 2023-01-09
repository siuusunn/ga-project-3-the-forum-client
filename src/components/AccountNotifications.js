import { Link } from 'react-router-dom';
import { Paper } from '@mui/material';

export default function AccountNotifications({ notifications }) {
  return (
    <div className={AccountNotifications}>
      {notifications?.map((notification) => (
        <Paper key={notification._id}>
          <Link>
            <p>
              {notification?.fromUser?.username} commented on your{' '}
              {notification?.contentType}!
            </p>
          </Link>
        </Paper>
      ))}
    </div>
  );
}
