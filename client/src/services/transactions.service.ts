import { ICreateTransactionDto, ITransaction } from '../types/types.ts';
import {
  API_TOTAL_COUNT_ROUTE,
  API_TOTAL_EXPENSE_ROUTE,
  API_TOTAL_INCOME_ROUTE,
  API_TRANSACTIONS_ROUTE,
  LIMIT_TRANSACTIONS,
} from '../helpers/consts.ts';
import {
  setTotalCount,
  setTotalExpense,
  setTotalIncome,
  setTransactions,
} from '../store/transactions/transactionsSlice.ts';
import {
  defaultServiceGetFunction,
  defaultServicePostFunction,
} from './default.service.ts';
import { AppDispatch } from '../store/store.ts';
import { authInstance } from './index.ts';

class TransactionsService {
  createTransaction = async (transactionDto: ICreateTransactionDto) => {
    return await defaultServicePostFunction<
      ITransaction,
      ICreateTransactionDto
    >(API_TRANSACTIONS_ROUTE, undefined, undefined, true, transactionDto);
  };

  deleteTransaction = async (transactionId: number) => {
    const { data } = await authInstance.delete(
      API_TRANSACTIONS_ROUTE + `/${transactionId}`,
    );
    if (!data) throw new Error('Что-то пошло не так');
    return data;
  };

  getTransactions = async (
    dispatch: AppDispatch,
    page: number = 1,
    limit: number = LIMIT_TRANSACTIONS,
  ) => {
    return await defaultServiceGetFunction<ITransaction[]>(
      API_TRANSACTIONS_ROUTE + `?page=${page}&limit=${limit}`,
      dispatch,
      setTransactions,
      true,
    );
  };

  getTotalIncome = async (dispatch: AppDispatch) => {
    return await defaultServiceGetFunction<number>(
      API_TOTAL_INCOME_ROUTE,
      dispatch,
      setTotalIncome,
      true,
    );
  };

  getTotalExpense = async (dispatch: AppDispatch) => {
    return await defaultServiceGetFunction<number>(
      API_TOTAL_EXPENSE_ROUTE,
      dispatch,
      setTotalExpense,
      true,
    );
  };

  getTotalCount = async (dispatch: AppDispatch) => {
    return await defaultServiceGetFunction<number>(
      API_TOTAL_COUNT_ROUTE,
      dispatch,
      setTotalCount,
      true,
    );
  };

  updateTransactionsData = async (
    dispatch: AppDispatch,
    page: number = 1,
    limit: number = LIMIT_TRANSACTIONS,
    updateTransactions: boolean = true,
  ) => {
    if (updateTransactions) await this.getTransactions(dispatch, page, limit);
    await this.getTotalIncome(dispatch);
    await this.getTotalExpense(dispatch);
    await this.getTotalCount(dispatch);
  };
}

export default new TransactionsService();
