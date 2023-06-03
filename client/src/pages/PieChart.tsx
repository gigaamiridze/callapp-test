import { useEffect, useState } from 'react';
import { Pie } from '@ant-design/charts';
import { IUser, ICityData, IChartConfig  } from '../interfaces';
import { tabTitle } from '../utils';
import { useUserStore } from '../store';
import { ChartContainer, ChartTitle } from '../components';

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
    const city: string | undefined = user.address?.city;
    if (city !== undefined) {
      cityCounts[city] = (cityCounts[city] || 0) + 1;
    }
  });

  const data: ICityData[] = Object.entries(cityCounts).map(([city, count]) => ({
    city,
    count,
  }));

  const config: IChartConfig = {
    data,
    appendPadding: 10,
    angleField: 'count',
    colorField: 'city',
    radius: 0.9,
    label: {
      type: 'inner',
      offset: '-30%',
      content: '{percentage}',
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
    <ChartContainer>
      <ChartTitle>Percentage of people by city</ChartTitle>
      <Pie {...config} />
    </ChartContainer>
  )
}

export default PieChart;