export const LOGIN_ROUTE = '/login';
export const REGISTRATION_ROUTE = '/registration';
export const TRANSACTIONS_ROUTE = '/transactions';
export const CATEGORIES_ROUTE = '/categories';

export const API_AUTH_ROUTE = '/auth';
export const API_LOGIN_ROUTE = API_AUTH_ROUTE + LOGIN_ROUTE;
export const API_REGISTRATION_ROUTE = API_AUTH_ROUTE + REGISTRATION_ROUTE;
export const API_CATEGORIES_ROUTE = CATEGORIES_ROUTE;
export const API_TRANSACTIONS_ROUTE = TRANSACTIONS_ROUTE;
export const API_TOTAL_COUNT_ROUTE = API_TRANSACTIONS_ROUTE + '/count';
export const API_TOTAL_INCOME_ROUTE =
  API_TRANSACTIONS_ROUTE + '/amount/?type=income';
export const API_TOTAL_EXPENSE_ROUTE =
  API_TRANSACTIONS_ROUTE + '/amount/?type=expense';
export const LIMIT_TRANSACTIONS = 5;
