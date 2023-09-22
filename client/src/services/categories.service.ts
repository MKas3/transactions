import { ICategory, ICreateCategoryDto } from '../types/types.ts';
import { API_CATEGORIES_ROUTE, CATEGORIES_ROUTE } from '../helpers/consts.ts';
import { setCategories } from '../store/categories/categoriesSlice.ts';
import {
  defaultServiceGetFunction,
  defaultServicePostFunction,
} from './default.service.ts';
import { AppDispatch } from '../store/store.ts';
import { authInstance } from './index.ts';

class CategoriesService {
  createCategory = async (categoryDto: ICreateCategoryDto) => {
    return await defaultServicePostFunction<ICategory, ICreateCategoryDto>(
      API_CATEGORIES_ROUTE,
      undefined,
      undefined,
      true,
      categoryDto,
    );
  };

  updateCategory = async (
    categoryId: number,
    categoryDto: ICreateCategoryDto,
  ) => {
    const { data } = await authInstance.patch<ICategory | undefined>(
      API_CATEGORIES_ROUTE + `/${categoryId}`,
      categoryDto,
    );
    if (!data) throw new Error('Что-то пошло не так');
    return data;
  };

  deleteCategory = async (categoryId: number) => {
    const { data } = await authInstance.delete(
      CATEGORIES_ROUTE + `/${categoryId}`,
    );
    if (!data) throw new Error('Что-то пошло не так');
    return data;
  };

  getCategories = async (dispatch: AppDispatch) => {
    return await defaultServiceGetFunction<ICategory[]>(
      API_CATEGORIES_ROUTE,
      dispatch,
      setCategories,
      true,
    );
  };
}

export default new CategoriesService();
