import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Req,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { FilterTransactionDto } from './dto/filter-transaction.dto';

@Controller('transactions')
export class TransactionController {
  constructor(private readonly transactionService: TransactionService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  findAll(
    @Query('limit') limit: number = 3,
    @Query('page') page: number = 1,
    @Req() req,
  ) {
    return this.transactionService.findAll(+page, +limit, +req.user.id);
  }

  @Get('filter')
  @UseGuards(JwtAuthGuard)
  findAllByType(
    @Query(new ValidationPipe({ forbidNonWhitelisted: true }))
    query: FilterTransactionDto,
    @Req() req,
  ) {
    return this.transactionService.findAllByType(query.type, +req.user.id);
  }

  @Get('amount')
  @UseGuards(JwtAuthGuard)
  getTotalAmount(
    @Query(new ValidationPipe({ forbidNonWhitelisted: true }))
    query: FilterTransactionDto,
    @Req() req,
  ) {
    return this.transactionService.getTotalAmount(query.type, +req.user.id);
  }

  @Get('count')
  @UseGuards(JwtAuthGuard)
  getTotalCount(@Req() req) {
    return this.transactionService.getTotalCount(+req.user.id);
  }

  @Post()
  @UsePipes(new ValidationPipe({ whitelist: true }))
  @UseGuards(JwtAuthGuard)
  create(@Body() createTransactionDto: CreateTransactionDto, @Req() req) {
    return this.transactionService.create(createTransactionDto, +req.user.id);
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  findOne(@Param('id') id: string, @Req() req) {
    return this.transactionService.findOne(+id, +req.user.id);
  }

  @Patch(':id')
  @UsePipes(new ValidationPipe({ whitelist: true }))
  @UseGuards(JwtAuthGuard)
  update(
    @Param('id') id: string,
    @Body() updateTransactionDto: UpdateTransactionDto,
    @Req() req,
  ) {
    return this.transactionService.update(
      +id,
      updateTransactionDto,
      +req.user.id,
    );
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  remove(@Param('id') id: string, @Req() req) {
    return this.transactionService.remove(+id, +req.user.id);
  }
}
