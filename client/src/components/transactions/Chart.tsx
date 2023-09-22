import {
  ArcElement,
  Chart as ChartJS,
  ChartData,
  Legend,
  Tooltip,
} from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

type ChartProps = {
  totalIncome: number;
  totalExpense: number;
};

const COLORS = ['#00C49F', '#FF8042'];

function Chart({ totalIncome, totalExpense }: ChartProps) {
  const data: ChartData<'doughnut', number[], string> = {
    labels: ['Income', 'Expense'],
    datasets: [
      {
        label: 'Total',
        data: [totalIncome, totalExpense],
        backgroundColor: [COLORS[0], COLORS[1]],
        borderWidth: 0,
        hoverOffset: 2,
      },
    ],
  };
  return (
    <div className='flex h-4/5 w-full items-center justify-center'>
      <Doughnut
        data={data}
        options={{
          plugins: {
            legend: {
              labels: {
                font: {
                  size: 15,
                  family: 'Roboto',
                  weight: '400',
                },
                color: '#ffffff',
              },
              position: 'bottom',
            },
          },
          cutout: '60%',
        }}
      />
    </div>
  );
}

export default Chart;
