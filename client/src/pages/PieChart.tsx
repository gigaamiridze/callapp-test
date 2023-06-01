import { useEffect } from 'react';
import { tabTitle } from '../utils';

function PieChart() {
  useEffect(() => {
    tabTitle('Users Chart');
  }, []);

  return (
    <div>Pie Chart</div>
  )
}

export default PieChart;