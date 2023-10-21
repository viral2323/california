import { toast } from 'react-toastify';
import "../index.scss";
type toast = 'info' | 'success' | 'warning' | 'error' | 'default' 
const showToast = (message: string, type: toast  = 'info', duration: number = 3000) => {
  switch (type) {
    case 'success':
      toast.success(message, { autoClose: duration, className: 'custom-toast'});
      break;
    case 'error':
      toast.error(message, { autoClose: duration, className: 'custom-toast' });
      break;
    case 'info':
      toast.info(message, { autoClose: duration, className: 'custom-toast' });
      break;
    case 'warning':
      toast.warning(message, { autoClose: duration, className: 'custom-toast' });
      break;
    default:
      toast(message, { autoClose: duration, className: 'custom-toast' });
      break;
  }
};

export default showToast;