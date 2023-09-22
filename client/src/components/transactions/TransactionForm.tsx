import { useNavigate } from 'react-router-dom';
import { FaPlus } from 'react-icons/fa';
import { ICategory, TransactionType } from '../../types/types.ts';
import { useForm } from 'react-hook-form';
import TransactionsService from '../../services/transactions.service.ts';
import { useAppDispatch } from '../../store/hooks.ts';

type TransactionFormProps = {
  categories: ICategory[];
};

type FormValues = {
  title: string;
  amount: string;
  category: string;
  type: TransactionType;
};

function TransactionForm({ categories }: TransactionFormProps) {
  const dispatch = useAppDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<FormValues>();
  const navigate = useNavigate();

  const handleTransactionForm = async (data: FormValues) => {
    const { amount: strAmount, category } = data;
    let { type } = data;
    if (!category) {
      setError('category', {
        type: 'required',
        message: 'Category is undefined',
      });
      return;
    }

    let amount = +strAmount;
    if (amount < 0) {
      amount *= -1;
      switch (type) {
        case TransactionType.Income:
          type = TransactionType.Expense;
          break;
        case TransactionType.Expense:
          type = TransactionType.Income;
          break;
      }
    }
    await TransactionsService.createTransaction({
      title: data.title,
      amount,
      type,
      categoryId: +data.category,
    });
    await TransactionsService.updateTransactionsData(dispatch, 0, 0, false);
  };

  return (
    <div className='rounded-md bg-slate-800 p-4'>
      <form
        className='grid gap-2'
        onSubmit={handleSubmit(handleTransactionForm)}
      >
        <span>Title</span>
        <input
          className='input border-slate-700'
          type='text'
          placeholder='Title...'
          {...register('title', {
            required: true,
          })}
        />
        {errors.title && (
          <span className='text-red-500'>Please write the title</span>
        )}

        <span>Amount</span>
        <input
          className='input border-slate-700'
          type='number'
          placeholder='Amount...'
          {...register('amount', {
            required: true,
          })}
        />
        {errors.amount && (
          <span className='text-red-500'>Please write the amount</span>
        )}

        {categories.length ? (
          <label htmlFor='category' className='grid'>
            <span>Category</span>
            <select
              className='input border-slate-700 bg-slate-800'
              {...register('category', {
                required: true,
              })}
            >
              {categories.map((category, index) => (
                <option key={index} value={category.id}>
                  {category.title}
                </option>
              ))}
            </select>
          </label>
        ) : (
          <h1 className='mt-1 text-red-500'>
            To continue create a category first
          </h1>
        )}

        <button
          type='button'
          className='flex max-w-fit items-center gap-2 text-white/50 hover:text-white'
          onClick={() => navigate('/categories')}
        >
          <FaPlus />
          <span>Manage Categories</span>
        </button>

        <div className='flex items-center gap-4'>
          <label className='flex cursor-pointer items-center gap-2'>
            <input
              type='radio'
              className='form-radio text-blue-600'
              value='income'
              defaultChecked={true}
              {...register('type')}
            />
            <span>Income</span>
          </label>
          <label className='flex cursor-pointer items-center gap-2'>
            <input
              type='radio'
              className='form-radio text-blue-600'
              value='expense'
              {...register('type')}
            />
            <span>Expense</span>
          </label>
        </div>

        <button className='btn btn-green mt-2 max-w-fit'>Submit</button>
      </form>
    </div>
  );
}

export default TransactionForm;
