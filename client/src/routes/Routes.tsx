import { createBrowserRouter, createRoutesFromElements, Route } from 'react-router-dom';
import { Root, Home, PieChart, UsersTable, NotFound } from '../pages';

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' Component={Root}>
      <Route index Component={Home} />
      <Route path='/chart' Component={PieChart} />
      <Route path='/users' Component={UsersTable} />
      <Route path='*' Component={NotFound} />      
    </Route>
  )
);