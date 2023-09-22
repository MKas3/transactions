import { useForm } from 'react-hook-form';
import CategoriesService from '../services/categories.service.ts';
import { useAppDispatch } from '../store/hooks.ts';

export enum CategoryModalTypes {
  Create,
  Edit,
}

type CategoryModalProps = {
  type: CategoryModalTypes;
  id?: number;
  setIsVisible: (isVisible: boolean) => void;
};

type FormValues = {
  title: string;
};

function CategoryModal({ type, id, setIsVisible }: CategoryModalProps) {
  const dispatch = useAppDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();

  const handleCategoryAction = async (data: FormValues) => {
    if (type === CategoryModalTypes.Edit && id !== undefined)
      await CategoriesService.updateCategory(id, data);
    else await CategoriesService.createCategory(data);

    setIsVisible(false);

    await CategoriesService.getCategories(dispatch);
  };

  return (
    <div className='fixed inset-0 flex h-full w-full items-center justify-center bg-black/50'>
      <form
        className='grid w-[300px] gap-2 rounded-md bg-slate-900 p-5'
        onSubmit={handleSubmit(handleCategoryAction)}
      >
        <p>Category</p>
        <input
          className='input w-full'
          type='text'
          placeholder='Title...'
          {...register('title', {
            required: true,
          })}
        />
        {errors.title && (
          <span className='text-red-500'>Please write the title</span>
        )}

        <div className='flex items-center gap-2'>
          <button className='btn btn-green' type='submit'>
            {type === CategoryModalTypes.Edit ? 'Save' : 'Create'}
          </button>
          <button
            type='button'
            className='btn btn-red'
            onClick={() => setIsVisible(false)}
          >
            Close
          </button>
        </div>
      </form>
    </div>
  );
}

export default CategoryModal;
