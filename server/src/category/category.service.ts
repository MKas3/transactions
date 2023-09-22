import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { Repository } from 'typeorm';
import { Category } from './entities/category.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
  ) {}

  async create(createCategoryDto: CreateCategoryDto, userId: number) {
    const candidate = await this.categoryRepository.findBy({
      user: {
        id: userId,
      },
      title: createCategoryDto.title,
    });

    if (candidate.length)
      throw new BadRequestException('Категория уже существует');

    return await this.categoryRepository.save({
      title: createCategoryDto.title,
      user: {
        id: userId,
      },
    });
  }

  async findAll(userId: number) {
    return await this.categoryRepository.find({
      where: {
        user: { id: userId },
      },
      relations: {
        transactions: true,
      },
    });
  }

  async findOne(id: number, userId: number) {
    const candidate = await this.categoryRepository.findOne({
      where: {
        id,
        user: {
          id: userId,
        },
      },
      relations: {
        transactions: true,
      },
    });

    if (!candidate) throw new BadRequestException('Категория не найдена');

    return candidate;
  }

  async update(
    id: number,
    updateCategoryDto: UpdateCategoryDto,
    userId: number,
  ) {
    const candidate = await this.categoryRepository.findOne({
      where: {
        id,
        user: {
          id: userId,
        },
      },
    });

    if (!candidate) throw new BadRequestException('Категория не найдена');

    const sameCandidate = await this.categoryRepository.findOne({
      where: {
        title: updateCategoryDto.title,
        user: {
          id: userId,
        },
      },
    });

    if (sameCandidate)
      throw new BadRequestException('Категория с таким именем уже существует');

    return await this.categoryRepository.update(id, updateCategoryDto);
  }

  async remove(id: number, userId: number) {
    const candidate = await this.categoryRepository.findOne({
      where: {
        id,
        user: {
          id: userId,
        },
      },
    });

    if (!candidate) throw new BadRequestException('Категория не найдена');

    return await this.categoryRepository.delete(id);
  }
}
