import { TransactionType } from '../../types/types';
import { Matches } from 'class-validator';

export const TransactionTypeRegex = /^expense$|^income$/;
export class FilterTransactionDto {
  @Matches(TransactionTypeRegex, { message: 'Invalid type' })
  type: TransactionType;
}
