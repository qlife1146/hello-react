import { useContext } from "react";
import TodoContext from "../todo/contexts/TodoContext";

const TrendHeader = () => {
  const { componentName } = useContext(TodoContext);
  if (!componentName || componentName !== "TrendBox") {
    return <></>;
  }

  return <button></button>;
};

export default TrendHeader;
