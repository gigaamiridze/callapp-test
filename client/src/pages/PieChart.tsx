import { useEffect, useState } from 'react';
import { Pie } from '@ant-design/charts';
import { IUser, ICityData } from '../interfaces';
import { tabTitle } from '../utils';
import { useUserStore } from '../store';

function PieChart() {
  const { getUsers } = useUserStore();
  const [users, setUsers] = useState<IUser[]>();
  const cityCounts: Record<string, number> = {};

  useEffect(() => {
    tabTitle('Users Chart');
    getUsers()
      .then(response => {
        setUsers(response.users);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  users?.map((user) => {
    const { city } = user.address;
    cityCounts[city] = (cityCounts[city] || 0) + 1;
  });

  const data: ICityData[] = Object.entries(cityCounts).map(([city, count]) => ({
    city,
    count,
  }));

  const configs = {
    data,
    appendPadding: 10,
    angleField: 'count',
    colorField: 'city',
    radius: 0.9,
    label: {
      type: 'inner',
      offset: '-30%',
      content: ({ percent }) => `${(percent * 100).toFixed(0)}%`,
      style: {
        fontSize: 14,
        textAlign: 'center',
      },
    },
    legend: {
      layout: 'horizontal',
      position: 'bottom',
    },
    interactions: [{ type: 'element-active' }],
  };

  return (
    <Pie {...configs} />
  )
}

export default PieChart;