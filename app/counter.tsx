import { useState } from "react";

const Counter = () => {
  let [count, setCount] = useState(0);

  return (
    <div>
      <h3>Push Me:</h3>
      <button onClick={() => setCount(count + 1)}>{count}</button>
    </div>
  );
};
export default Counter;
