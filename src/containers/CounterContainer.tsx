import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../modules";
import { increase, decrease, increaseBy } from "../modules/counter";
import Counter from "../components/Counter";

export default function CounterContainer() {
  // 상태를 조회합니다. 상태 조회 시 state의 타입을 RootState로 지정해야 합니다.
  const count: number = useSelector((state: RootState) => state.counter.count);
  const dispatch = useDispatch(); // 디스패치 함수를 가져옵니다.
  // 각 액션을 디스패치하는 함수들ㅇ르 만들어 줍니다

  const onIncrease = () => {
    dispatch(increase());
  };

  const onDecrease = () => {
    dispatch(decrease());
  };

  const onIncreaseBy = (diff: number) => {
    dispatch(increaseBy(diff));
  };

  return (
    <Counter
      count={count}
      onIncrease={onIncrease}
      onDecrease={onDecrease}
      onIncreaseBy={onIncreaseBy}
    />
  );
}
