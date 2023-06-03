import { Outlet } from 'react-router-dom';
import { Header } from '../layouts';

function Root() {
  return (
    <>
      <Header />
      <Outlet />
    </>
  )
}

export default Root;