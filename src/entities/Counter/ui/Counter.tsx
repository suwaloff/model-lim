import { useDispatch, useSelector } from 'react-redux';
import { Button } from 'shared/ui/button';
import { counterActions } from './model/slice/counterSlice';
import { getCounterValue } from './model/selectors/getCounterValue/getCounterValue';

export const Counter = () => {
  const dispatch = useDispatch();
  const value = useSelector(getCounterValue);

  const increment = () => {
    dispatch(counterActions.increment());
  };
  const decrement = () => {
    dispatch(counterActions.increment());
  };
  return (
    <div>
      <h1>value: {value} </h1>
      <Button onClick={increment}>increment</Button>
      <Button onClick={decrement}>decrement</Button>
    </div>
  );
};
