import React, { useContext, useReducer } from 'react';

function reducer(state, action) {
  switch (action.type) {
    case 'increase':
      return {
        ...state,
        count: state.count + 1,
      };
    case 'decrement':
      return {
        ...state,
        count: state.count - 1,
      };
  }
  return state;
}

const initialState = {
  count: 0,
};

const AppContext = React.createContext(null);

function App({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
}

function useCounter() {
  const { state, dispatch } = useContext(AppContext);
  function increase() {
    dispatch({
      type: 'increase',
    });
  }
  function decrement() {
    dispatch({
      type: 'decrement',
    });
  }
  return {
    count: state.count,
    increase,
    decrement,
  };
}

/** 计数器显示组件 */
function CounterDisplay() {
  const { count } = useCounter();
  return (
    <div>
      <p>Count: {count}</p>
    </div>
  );
}

/** 计数器操作组件 */
function CounterAction() {
  const { increase, decrement } = useCounter();
  return (
    <div>
      <button type="button" onClick={increase}>
        +
      </button>
      <button type="button" onClick={decrement}>
        -
      </button>
    </div>
  );
}

export default function Demo3() {
  return (
    <App>
      <CounterDisplay></CounterDisplay>
      <CounterAction></CounterAction>
    </App>
  );
}
