import { useState } from "react";
import "./App.css";

function App() {
  const [input, setInput] = useState("0");
  const [result, setResult] = useState("");
  const [error, setError] = useState("");

  const handleNumberClick = (value) => {
    if (value === ".") {
      const parts = input.split(/[-+*/]/);
      const lastPart = parts[parts.length - 1];
      if (lastPart.includes(".")) return;
    }

    setInput((prevInput) => {
      if (prevInput === "0" && value !== ".") {
        return String(value);
      } else {
        return prevInput + value;
      }
    });
    setError("");
  };

  const handleOperatorClick = (operator) => {
    setInput((prevInput) => {
      if (
        prevInput.endsWith("+") ||
        prevInput.endsWith("*") ||
        prevInput.endsWith("/")
      ) {
        if (operator === "-") {
          return prevInput + operator;
        } else {
          return prevInput.slice(0, -1) + operator;
        }
      } else if (
        prevInput.endsWith("-") &&
        prevInput.length >= 2 &&
        /[*+/-]/.test(prevInput[prevInput.length - 2])
      ) {
        return prevInput.slice(0, -2) + operator;
      } else if (prevInput === "" && operator === "-") {
        return operator;
      } else {
        return prevInput + operator;
      }
    });
    setError("");
  };

  const handleEqualClick = () => {
    try {
      const evaluatedResult = new Function(`return ${input}`)();
      const roundedResult = parseFloat(evaluatedResult.toFixed(4));
      setInput(roundedResult.toString());
      setResult(roundedResult.toString());
    } catch (error) {
      setInput("");
      setError("Error");
    }
  };

  const handleClearClick = () => {
    setInput("0");
    setResult("");
    setError("");
  };

  return (
    <main className="main">
      <div className="calculator">
        <div className="calculator__display">
          <p className="calculator__display__input" id="display">
            {input}
          </p>
          {error && <p className="calculator__display__error">{error}</p>}
          {result && <p className="calculator__display__result">{result}</p>}
        </div>
        <div className="calculator__keys">
          <button
            className="calculator__key calculator__key-clear"
            onClick={handleClearClick}
            id="clear"
          >
            AC
          </button>
          <button
            className="calculator__key calculator__key-operator"
            onClick={() => handleOperatorClick("/")}
            id="divide"
          >
            /
          </button>
          <button
            className="calculator__key calculator__key-operator"
            onClick={() => handleOperatorClick("*")}
            id="multiply"
          >
            x
          </button>
          <button
            className="calculator__key"
            onClick={() => handleNumberClick(7)}
            id="seven"
          >
            7
          </button>
          <button
            className="calculator__key"
            onClick={() => handleNumberClick(8)}
            id="eight"
          >
            8
          </button>
          <button
            className="calculator__key"
            onClick={() => handleNumberClick(9)}
            id="nine"
          >
            9
          </button>
          <button
            className="calculator__key calculator__key-operator"
            onClick={() => handleOperatorClick("-")}
            id="subtract"
          >
            -
          </button>
          <button
            className="calculator__key"
            onClick={() => handleNumberClick(4)}
            id="four"
          >
            4
          </button>
          <button
            className="calculator__key"
            onClick={() => handleNumberClick(5)}
            id="five"
          >
            5
          </button>
          <button
            className="calculator__key"
            onClick={() => handleNumberClick(6)}
            id="six"
          >
            6
          </button>
          <button
            className="calculator__key calculator__key-operator"
            onClick={() => handleOperatorClick("+")}
            id="add"
          >
            +
          </button>
          <button
            className="calculator__key"
            onClick={() => handleNumberClick(1)}
            id="one"
          >
            1
          </button>
          <button
            className="calculator__key"
            onClick={() => handleNumberClick(2)}
            id="two"
          >
            2
          </button>
          <button
            className="calculator__key"
            onClick={() => handleNumberClick(3)}
            id="three"
          >
            3
          </button>
          <button
            className="calculator__key calculator__key-equal"
            onClick={handleEqualClick}
            id="equals"
          >
            =
          </button>
          <button
            className="calculator__key calculator__key-zero"
            onClick={() => handleNumberClick(0)}
            id="zero"
          >
            0
          </button>
          <button
            className="calculator__key"
            onClick={() => handleNumberClick(".")}
            id="decimal"
          >
            .
          </button>
        </div>
      </div>
    </main>
  );
}

export default App;
