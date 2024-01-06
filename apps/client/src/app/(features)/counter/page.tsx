// apps/client/src/app/counter/page.tsx
'use client';

import { useAppDispatch, useAppSelector } from '@/lib/redux/hooks';
import { incremented, amountAdded } from '@/features/counter-slice';
import Container from '@/components/container';

function Page() {
  const count = useAppSelector((state) => state.counter.value);
  const dispatch = useAppDispatch();

  const handleClick = () => {
    dispatch(incremented());
  };

  const handleAmountAdded = () => {
    dispatch(amountAdded(3));
  };

  return (
    <Container>
      <h1>Counter</h1>
      <div className="">
        <div>{count}</div>

        <button
          className="bg-blue-500 px-4 py-2 mt-2 rounded"
          onClick={handleClick}
        >
          Increment
        </button>

        <button
          className="bg-blue-500 px-4 py-2 mt-2 rounded ml-2"
          onClick={handleAmountAdded}
        >
          Add 3
        </button>
      </div>
    </Container>
  );
}
export default Page;
