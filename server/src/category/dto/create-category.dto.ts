import { IsNotEmpty, IsString } from 'class-validator';

export class CreateCategoryDto {
  @IsNotEmpty({ message: 'The title cannot be empty' })
  @IsString({ message: 'The title should be a string' })
  title: string;
}
