import { useEffect } from 'react';
import { tabTitle } from '../utils';

function Home() {
  useEffect(() => {
    tabTitle('Callapp - Home');
  }, []);

  return (
    <div>Home</div>
  )
}

export default Home;