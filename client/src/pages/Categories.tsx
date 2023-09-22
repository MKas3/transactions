import { AiFillCloseCircle, AiFillEdit } from 'react-icons/ai';
import { FaPlus } from 'react-icons/fa';
import CategoryModal, {
  CategoryModalTypes,
} from '../components/CategoryModal.tsx';
import { useCallback, useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../store/hooks.ts';
import CategoriesService from '../services/categories.service.ts';

function Categories() {
  const dispatch = useAppDispatch();
  const categoriesState = useAppSelector((state) => state.categories);
  const [isCreateModalVisible, setCreateIsModalVisible] = useState(false);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [categoryId, setCategoryId] = useState(0);

  const getCategoriesState = useCallback(async () => {
    await CategoriesService.getCategories(dispatch);
  }, [dispatch]);

  const deleteCategory = async (categoryId: number) => {
    await CategoriesService.deleteCategory(categoryId);
    await getCategoriesState();
  };

  useEffect(() => {
    getCategoriesState().catch((e) => console.log(e));
  }, [getCategoriesState]);

  return (
    <>
      <div className='mt-10 rounded-md bg-slate-800 p-4'>
        <h1>Your category list</h1>
        <div className='mt-2 flex flex-wrap items-center gap-2'>
          {categoriesState.categories.map((category, index) => (
            <div
              key={index}
              className='group relative flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2'
            >
              {category.title}
              <div className='absolute inset-0 hidden items-center justify-between rounded-lg bg-black/90 px-3 group-hover:flex'>
                <button
                  onClick={() => {
                    setCategoryId(category.id);
                    setIsEditModalVisible(true);
                  }}
                >
                  <AiFillEdit />
                </button>

                <button
                  type='button'
                  onClick={() => deleteCategory(category.id)}
                >
                  <AiFillCloseCircle />
                </button>
              </div>
            </div>
          ))}
        </div>

        <button
          className='mt-5 flex max-w-fit items-center gap-2 text-white/50 hover:text-white'
          onClick={() => setCreateIsModalVisible(true)}
        >
          <FaPlus />
          <span>Create a new category</span>
        </button>
      </div>
      {isCreateModalVisible && (
        <CategoryModal
          type={CategoryModalTypes.Create}
          setIsVisible={setCreateIsModalVisible}
        />
      )}
      {isEditModalVisible && (
        <CategoryModal
          type={CategoryModalTypes.Edit}
          id={categoryId}
          setIsVisible={setIsEditModalVisible}
        />
      )}
    </>
  );
}

export default Categories;
