import { useEffect } from 'react';
import { tabTitle } from '../utils';
import { Title } from '../components';

function Home() {
  useEffect(() => {
    tabTitle('Callapp - Home');
  }, []);

  return (
    <Title>Welcome to home page</Title>
  )
}

export default Home;