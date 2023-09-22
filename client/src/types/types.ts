export enum TransactionType {
  Income = 'income',
  Expense = 'expense',
}

export interface IUserData {
  email: string;
  password: string;
}

export interface IResponseUserData {
  id: string;
  email: string;
  token: string;
}

export interface ICategory {
  title: string;
  id: number;
  createdAt: string;
  updatedAt: string;
  transactions?: [];
}

export interface ITransaction {
  id: number;
  amount: number;
  title: string;
  createdAt: string;
  updatedAt: string;
  type: TransactionType;
  category: ICategory;
}

export interface ICreateTransactionDto {
  title: string;
  amount: number;
  type: TransactionType;
  categoryId: number;
}

export interface ICreateCategoryDto {
  title: string;
}
