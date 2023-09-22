import { FaTrash } from 'react-icons/fa';
import { Form } from 'react-router-dom';
import { ITransaction } from '../../types/types.ts';
import { formatDate } from '../../helpers/date.helper.ts';
import { formatToUSD } from '../../helpers/currency.helper.ts';
import { useCallback, useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';
import TransactionsService from '../../services/transactions.service.ts';
import { LIMIT_TRANSACTIONS } from '../../helpers/consts.ts';
import { useAppDispatch } from '../../store/hooks.ts';

type TransactionTableProps = {
  allTransactions: ITransaction[];
  totalCount: number;
  limit?: number;
};

function TransactionTable({
  allTransactions,
  totalCount,
  limit = LIMIT_TRANSACTIONS,
}: TransactionTableProps) {
  const dispatch = useAppDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const getTransactionsState = useCallback(
    async (page: number) => {
      await TransactionsService.updateTransactionsData(dispatch, page, limit);
      setTotalPages(Math.ceil(totalCount / limit));
    },
    [dispatch, limit, totalCount],
  );

  const removeTransaction = async (transactionId: number) => {
    await TransactionsService.deleteTransaction(transactionId);
    await getTransactionsState(currentPage);
  };

  useEffect(() => {
    getTransactionsState(currentPage);
  }, [getTransactionsState, currentPage]);

  return (
    <>
      <ReactPaginate
        className='mt-4 flex items-center justify-end gap-3'
        activeClassName='bg-blue-600 rounded-md'
        pageLinkClassName='text-white text-xs py-1 px-2 rounded-sm'
        previousClassName='text-white py-1 px-2 bg-slate-800 rounded-md text-xs'
        nextClassName='text-white py-1 px-2 bg-slate-800 rounded-md text-xs'
        disabledClassName='text-white/50 cursor-not-allowed'
        disabledLinkClassName='text-slate-600 cursor-not-allowed'
        pageCount={totalPages}
        pageRangeDisplayed={1}
        marginPagesDisplayed={2}
        onPageChange={(selected) => setCurrentPage(selected.selected + 1)}
      />
      <div className='mt-4 rounded-md bg-slate-800 px-4 py-3'>
        <table className='w-full'>
          <thead>
            <tr>
              <td className='font-bold'>№</td>
              <td className='font-bold'>Title</td>
              <td className='font-bold'>Amount($)</td>
              <td className='font-bold'>Category</td>
              <td className='font-bold'>Date</td>
              <td className='text-right'>Action</td>
            </tr>
          </thead>
          <tbody>
            {allTransactions.map((transaction, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{transaction.title}</td>
                <td
                  className={
                    transaction.type === 'income'
                      ? 'text-green-500'
                      : 'text-red-500'
                  }
                >
                  {(transaction.type === 'income' ? '+ ' : '- ') +
                    formatToUSD(transaction.amount)}
                </td>
                <td>
                  {transaction.category?.title ?? (
                    <p className='text-gray-600'>Deleted</p>
                  )}
                </td>
                <td>{formatDate(transaction.createdAt)}</td>
                <td>
                  <Form method='delete' action='/client/src/pages/Transactions'>
                    <input type='hidden' name='id' value={transaction.id} />
                    <button
                      className='btn hover:btn-red ml-auto'
                      type='button'
                      onClick={() => removeTransaction(transaction.id)}
                    >
                      <FaTrash />
                    </button>
                  </Form>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default TransactionTable;
