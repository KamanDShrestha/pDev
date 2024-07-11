import { useQueryClient } from '@tanstack/react-query';
import { useAuthContext } from '../context/AuthProvider';
import { cn } from '../lib/utils';
import { Card, CardContent } from './ui/card';
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from './ui/dialog';
import { navigationMenuTriggerStyle } from './ui/navigation-menu';
import { IoAlert } from 'react-icons/io5';
import useGetAllNotifications from '../services/notifications/getAllNotifications';
import useUpdateNotificationReadStatus from '../services/notifications/updateNotificationReadStatus';
import useGetAllNotificationsByRole from '../services/notifications/getAllNotificationsByRole';

const NotificationDialog = () => {
  const { user } = useAuthContext();
  const { data: notifications } = useGetAllNotifications(user?.id as string);
  const { data: notificationsByRole } = useGetAllNotificationsByRole(
    user?.role as string
  );

  const { mutate: updateReadStatus } = useUpdateNotificationReadStatus();

  const queryClient = useQueryClient();
  function handleUpdateReadStatus(id: string) {
    updateReadStatus(
      { notificationId: id },
      {
        onSuccess: () => {
          queryClient.invalidateQueries(['notifications', user?.id]);
        },
      }
    );
  }

  return (
    <>
      <Dialog>
        <DialogTrigger className={navigationMenuTriggerStyle()}>
          Notifications
          {notifications &&
            notifications.filter(
              (obtainedNotification) => !obtainedNotification.isRead
            ).length > 0 && (
              <span className='text-lg text-red-500'>
                <IoAlert />
              </span>
            )}
        </DialogTrigger>
        <DialogContent className='h-[60vh] overflow-scroll'>
          {(!notifications || notifications?.length === 0) &&
          (!notificationsByRole || notificationsByRole?.length === 0) ? (
            <div className='flex items-center justify-center'>
              No notifications.
            </div>
          ) : (
            <>
              <DialogTitle>Notifications</DialogTitle>
              <div className='flex flex-col items-center justify-center h-full gap-5 '>
                {notifications &&
                  notifications
                    .concat(notificationsByRole ?? [])
                    .map((notification, index) => (
                      <Card
                        key={index}
                        className={cn(
                          notification.isRead
                            ? 'w-full'
                            : 'dark:bg-[#33415c] bg-[#e6e8e6] w-full'
                        )}
                      >
                        <CardContent className='p-2 space-y-3'>
                          <div>
                            <p className='font-medium'>
                              {notification.message}
                            </p>
                            <p className='text-sm'>
                              {new Date(
                                notification.createdAt
                              ).toLocaleString()}
                            </p>
                          </div>
                          {notification.isRead ? (
                            <p className='text-xs font-medium'>Acted on</p>
                          ) : (
                            <p
                              className='text-xs font-medium hover:cursor-pointer'
                              onClick={() =>
                                handleUpdateReadStatus(notification._id)
                              }
                            >
                              Read
                            </p>
                          )}
                        </CardContent>
                      </Card>
                    ))}
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default NotificationDialog;
