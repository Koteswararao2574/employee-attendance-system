import { format, parseISO, isToday, isYesterday, differenceInHours } from 'date-fns';

export const formatDate = (date) => {
  if (!date) return 'N/A';
  const parsedDate = typeof date === 'string' ? parseISO(date) : date;
  return format(parsedDate, 'MMM dd, yyyy');
};

export const formatTime = (date) => {
  if (!date) return 'N/A';
  const parsedDate = typeof date === 'string' ? parseISO(date) : date;
  return format(parsedDate, 'hh:mm a');
};

export const formatDateTime = (date) => {
  if (!date) return 'N/A';
  const parsedDate = typeof date === 'string' ? parseISO(date) : date;
  return format(parsedDate, 'MMM dd, yyyy hh:mm a');
};

export const getRelativeDate = (date) => {
  if (!date) return 'N/A';
  const parsedDate = typeof date === 'string' ? parseISO(date) : date;
  
  if (isToday(parsedDate)) return 'Today';
  if (isYesterday(parsedDate)) return 'Yesterday';
  return formatDate(parsedDate);
};

export const calculateHours = (checkIn, checkOut) => {
  if (!checkIn || !checkOut) return 0;
  const start = typeof checkIn === 'string' ? parseISO(checkIn) : checkIn;
  const end = typeof checkOut === 'string' ? parseISO(checkOut) : checkOut;
  return differenceInHours(end, start);
};

export const getStatusColor = (status) => {
  const colors = {
    present: 'bg-green-100 text-green-800',
    absent: 'bg-red-100 text-red-800',
    late: 'bg-yellow-100 text-yellow-800',
    'half-day': 'bg-orange-100 text-orange-800'
  };
  return colors[status] || 'bg-gray-100 text-gray-800';
};

export const getStatusBadgeColor = (status) => {
  const colors = {
    present: 'bg-green-500',
    absent: 'bg-red-500',
    late: 'bg-yellow-500',
    'half-day': 'bg-orange-500'
  };
  return colors[status] || 'bg-gray-500';
};