import { useState } from "react";

export const CounterState = () => {
  const [counter, setCounter] = useState(0);

  const onButtonClickHandler = (event) => {
    console.log(event.target.classList);
    const className = event.target.classList.value;
    setCounter((prevCount) => {
      if (className.includes("reduce")) {
        if (prevCount === 0) {
          return prevCount;
        }
        return prevCount - 1;
      } else if (className.includes("add")) {
        if (prevCount === 100) {
          return prevCount;
        }
        return prevCount + 1;
      }
      return prevCount;
    });
  };
  // const onAddButtonClickHandler = () => {
  //   // if (counter < 100) {
  //   //   setCounter(counter + 1);
  //   // }
  //   setCounter((prevCount) => {
  //     if (prevCount < 10) {
  //       prevCount += 1;
  //       return prevCount;
  //     }
  //     return prevCount;
  //   });
  // };

  // const onReduceButtonClickHandler = () => {
  //   // if (counter > 0) {
  //   //   setCounter(counter - 1);
  //   // }
  //   setCounter((prevCount) => {
  //     if (prevCount > 0) {
  //       prevCount -= 1;
  //       return prevCount;
  //     }
  //     return prevCount;
  //   });
  // };

  // const onResetButtonClickHandler = () => {
  //   setCounter(0);
  // };

  return (
    <Counter
      counter={counter}
      onAddButtonClick={onButtonClickHandler}
      onReduceButtonClick={onButtonClickHandler}
      // onResetButtonClick={onResetButtonClickHandler}
    />
  );
};

export const CalculatorState = () => {
  // const [xValue, setXValue] = useState(0);
  // const [yValue, setYValue] = useState(0);
  // const [result, setResult] = useState(0);
  const [{ xValue, yValue, result }, setNums] = useState({
    xValue: 10,
    yValue: 20,
    result: 0,
  });
  const onXChangeHandler = (event) => {
    // setXValue(Number(event.target.value));
    setNums((prevNums) => {
      const newNums = { ...prevNums, xValue: Number(event.target.value) };
      return newNums;
    });
  };
  // const onPlusButtonClickHandler = () => {
  //   setResult(Number(xValue) + Number(yValue));
  // };
  // const onMinusButtonClickHandler = () => {
  //   setResult(Number(xValue) - Number(yValue));
  // };
  // const onMultipleButtonClickHandler = () => {
  //   setResult(Number(xValue) * Number(yValue));
  // };
  // const onDivisionButtonClickHandler = () => {
  //   setResult((Number(xValue) / Number(yValue)).toFixed(5));
  // };
  const onYChangeHandler = (event) => {
    // setYValue(Number(event.target.value));
    setNums((prevNums) => {
      const newNums = { ...prevNums, yValue: Number(event.target.value) };
      return newNums;
    });
  };

  const onCalcButtonClickHandler = (operator) => {
    let resultNum = 0;
    if (operator === "+") {
      // setResult(Number(xValue) + Number(yValue));
      resultNum = xValue + yValue;
    } else if (operator === "-") {
      // setResult(Number(xValue) - Number(yValue));
      resultNum = xValue - yValue;
    } else if (operator === "x") {
      // setResult(Number(xValue) * Number(yValue));
      resultNum = xValue * yValue;
    } else if (operator === "÷") {
      // setResult(Number(xValue) / Number(yValue));
      resultNum = xValue / yValue;
    }
    setNums((prevNums) => {
      const newNums = {
        ...prevNums,
        result: resultNum,
      };
      return newNums;
    });
  };

  return (
    <Calculator
      xValue={xValue}
      yValue={yValue}
      result={result}
      onXChange={onXChangeHandler}
      onPlusButtonClick={onCalcButtonClickHandler.bind(this, "+")}
      onMinusButtonClick={onCalcButtonClickHandler.bind(this, "-")}
      onMultipleButtonClick={onCalcButtonClickHandler.bind(this, "x")}
      onDivisionButtonClick={onCalcButtonClickHandler.bind(this, "÷")}
      // onPlusButtonClick={onPlusButtonClickHandler}
      // onMinusButtonClick={onMinusButtonClickHandler}
      // onMultipleButtonClick={onMultipleButtonClickHandler}
      // onDivisionButtonClick={onDivisionButtonClickHandler}
      onYChange={onYChangeHandler}
    />
  );
};

const Counter = ({
  counter,
  onAddButtonClick,
  onReduceButtonClick,
  onResetButtonClick,
}) => {
  return (
    <div className="counter">
      <div>
        <button type="button" className="reduce" onClick={onReduceButtonClick}>
          -
        </button>
        <div>{counter}</div>
        <button type="button" className="add" onClick={onAddButtonClick}>
          +
        </button>
      </div>
      <div>
        <button type="button" onClick={onResetButtonClick}>
          Reset
        </button>
      </div>
    </div>
  );
};

const Button = ({ type = "button", title, onClick }) => {
  return (
    <button type={type} onClick={onClick}>
      {title}
    </button>
  );
};

const Input = ({ type = "number", value, onChange }) => {
  return <input type={type} value={value.toString()} onChange={onChange} />;
};

const Calculator = ({
  xValue,
  yValue,
  result,
  onXChange,
  onPlusButtonClick,
  onMinusButtonClick,
  onMultipleButtonClick,
  onDivisionButtonClick,
  onYChange,
}) => {
  return (
    <div className="calculator">
      <Input value={xValue} onChange={onXChange} />
      <div className="buttons">
        <Button title="+" onClick={onPlusButtonClick} />
        <Button title="-" onClick={onMinusButtonClick} />
        <Button title="x" onClick={onMultipleButtonClick} />
        <Button title="÷" onClick={onDivisionButtonClick} />
      </div>
      {/* <input type="text" value={yValue} onChange={onYChange} /> */}
      <Input value={yValue} onChange={onYChange} />

      <label>=</label>
      <div className="resultValue">{result}</div>
    </div>
  );
};

const CCMain = () => {
  return (
    <>
      <CounterState />
      <CalculatorState />
    </>
  );
};

export default CCMain;
