import { IsNotEmpty, IsNumber, IsString, Matches } from 'class-validator';
import { TransactionType } from '../../types/types';
import { TransactionTypeRegex } from './filter-transaction.dto';

export class CreateTransactionDto {
  @IsNotEmpty({ message: 'The title cannot be empty' })
  @IsString({ message: 'The title should be a string' })
  title: string;

  @IsNumber({}, { message: 'The amount should be a number' })
  amount: number;

  @Matches(TransactionTypeRegex, { message: 'Invalid type' })
  type: TransactionType;

  @IsNumber({}, { message: 'The category id should be a number' })
  categoryId: number;
}
