import { useEffect } from 'react';
import { tabTitle } from '../utils';

function NotFound() {
  useEffect(() => {
    tabTitle('Page Not Found');
  }, []);

  return (
    <div>Page Not Found</div>
  )
}

export default NotFound;