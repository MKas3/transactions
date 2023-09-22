import { ICategory } from '../../types/types.ts';
import { createSlice } from '@reduxjs/toolkit';

interface CategoriesState {
  categories: ICategory[];
}

const initialState: CategoriesState = {
  categories: [],
};

export const categoriesSlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {
    setCategories: (state, action) => {
      state.categories = action.payload;
    },
  },
});

export const { setCategories } = categoriesSlice.actions;

export default categoriesSlice.reducer;
