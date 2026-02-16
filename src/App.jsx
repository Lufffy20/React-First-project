import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Button } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { increment } from "./redux/counter/counterSlice";

function App() {

  const count = useSelector((state) => state.counter.value);
  const dispatch = useDispatch();

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>

      <h1>Vite + React + Redux</h1>

      <div className="card">
        <Button
          type="primary"
          onClick={() => dispatch(increment())}
        >
          count is {count}
        </Button>

        <p>
          Redux store count from counterSlice
        </p>
      </div>
    </>
  )
}

export default App
