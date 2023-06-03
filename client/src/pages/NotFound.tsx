import { useEffect } from 'react';
import { tabTitle } from '../utils';
import { Title } from '../components';

function NotFound() {
  useEffect(() => {
    tabTitle('Page Not Found');
  }, []);

  return (
    <Title>Page Not Found</Title>
  )
}

export default NotFound;