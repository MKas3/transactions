import TransactionForm from '../components/transactions/TransactionForm.tsx';
import TransactionTable from '../components/transactions/TransactionTable.tsx';
import { formatToUSD } from '../helpers/currency.helper.ts';
import Chart from '../components/transactions/Chart.tsx';
import { useAppDispatch, useAppSelector } from '../store/hooks.ts';
import { useEffect } from 'react';
import TransactionsService from '../services/transactions.service.ts';
import CategoriesService from '../services/categories.service.ts';

function Transactions() {
  const dispatch = useAppDispatch();
  const transactionsState = useAppSelector((state) => state.transactions);
  const categoriesState = useAppSelector((state) => state.categories);

  useEffect(() => {
    const getTransactionsState = async () => {
      await TransactionsService.updateTransactionsData(dispatch);
      await CategoriesService.getCategories(dispatch);
    };
    getTransactionsState().catch((e) => console.log(e));
  }, [dispatch]);

  return (
    <div className='overflow-auto'>
      <div className='mt-4 grid grid-cols-3 items-start gap-4'>
        <div className='col-span-2'>
          <TransactionForm categories={categoriesState.categories} />
        </div>
        <div className='h-full min-w-fit rounded-md bg-slate-800 p-3'>
          <div className='grid h-full min-w-fit grid-cols-2 grid-rows-4 gap-3'>
            <div className='flex flex-col overflow-clip'>
              <p className='text-md whitespace-nowrap text-center font-bold uppercase'>
                Total Income
              </p>
              <p className='mt-2 rounded-sm bg-green-600 p-1 text-center'>
                {formatToUSD(transactionsState.totalIncome)}
              </p>
            </div>
            <div className='flex flex-col overflow-clip'>
              <p className='text-md whitespace-nowrap text-center font-bold uppercase'>
                Total Expense
              </p>
              <p className='mt-2 rounded-sm bg-red-500 p-1 text-center'>
                {formatToUSD(transactionsState.totalExpense)}
              </p>
            </div>
            <div className='col-span-2 row-span-3 h-full'>
              <Chart
                totalIncome={transactionsState.totalIncome}
                totalExpense={transactionsState.totalExpense}
              />
            </div>
          </div>
        </div>
      </div>
      <h1 className='my-5'>
        <TransactionTable
          allTransactions={transactionsState.transactions}
          totalCount={transactionsState.totalCount}
        />
      </h1>
    </div>
  );
}

export default Transactions;
