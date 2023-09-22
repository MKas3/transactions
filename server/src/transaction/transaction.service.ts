import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Transaction } from './entities/transaction.entity';
import { Repository } from 'typeorm';
import { Category } from '../category/entities/category.entity';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { TransactionType } from '../types/types';

@Injectable()
export class TransactionService {
  constructor(
    @InjectRepository(Transaction)
    private readonly transactionRepository: Repository<Transaction>,
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
  ) {}

  async findAll(page: number, limit: number, userId: number) {
    const transactions = await this.transactionRepository.find({
      where: {
        user: { id: userId },
      },
      relations: {
        category: true,
      },
      order: {
        createdAt: 'DESC',
      },
      take: limit,
      skip: (page - 1) * limit,
    });

    return transactions;
  }

  async findAllByType(type: TransactionType, userId: number) {
    const transactions = await this.transactionRepository.find({
      where: {
        user: { id: userId },
        type,
      },
    });

    return transactions;
  }

  async getTotalAmount(type: TransactionType, userId: number) {
    const transactions = await this.findAllByType(type, userId);

    return transactions.reduce((prev, cur) => prev + cur.amount, 0);
  }

  async getTotalCount(userId: number) {
    const transactionsCount = await this.transactionRepository.count({
      where: {
        user: { id: userId },
      },
    });

    return transactionsCount;
  }

  async create(createTransactionDto: CreateTransactionDto, userId: number) {
    const categoryCandidate = await this.categoryRepository.findOne({
      where: { id: +createTransactionDto.categoryId },
    });

    if (!categoryCandidate)
      throw new BadRequestException('Категория не существует');

    return await this.transactionRepository.save({
      title: createTransactionDto.title,
      amount: createTransactionDto.amount,
      type: createTransactionDto.type,
      category: { id: +createTransactionDto.categoryId },
      user: { id: userId },
    });
  }

  async findOne(id: number, userId: number) {
    const transaction = await this.transactionRepository.findOne({
      where: {
        id,
        user: { id: userId },
      },
      relations: {
        category: true,
      },
    });

    if (!transaction) throw new BadRequestException('Транзакция не найдена');

    return transaction;
  }

  async update(
    id: number,
    updateTransactionDto: UpdateTransactionDto,
    userId: number,
  ) {
    const transaction = await this.transactionRepository.findOne({
      where: {
        id,
        user: { id: userId },
      },
      relations: {
        category: true,
      },
    });

    if (!transaction) throw new BadRequestException('Транзакция не найдена');

    const { categoryId, ...otherUpdateDto } = updateTransactionDto;

    if (!categoryId)
      return await this.transactionRepository.update(id, { ...otherUpdateDto });

    const categoryCandidate = await this.categoryRepository.findOne({
      where: {
        id: categoryId,
        user: { id: userId },
      },
    });

    if (!categoryCandidate)
      throw new BadRequestException('Категория не найдена');

    return await this.transactionRepository.update(id, {
      ...otherUpdateDto,
      category: {
        id: categoryId,
      },
    });
  }

  async remove(id: number, userId: number) {
    const transaction = await this.transactionRepository.findOne({
      where: {
        id,
        user: { id: userId },
      },
    });

    if (!transaction) throw new BadRequestException('Транзакция не найдена');

    return await this.transactionRepository.delete(id);
  }
}
