import TrendContext from "./contexts/TrendContext";
import { useContext } from "react";

const TrendList = ({ children }) => {
  const { componentName } = useContext(TrendContext);
  console.log("TrendList: " + componentName);

  if (!componentName || componentName !== "TrendBox") {
    return <></>;
  }
  return (
    <TrendContext.Provider value={{ componentName }}>
      {children}
    </TrendContext.Provider>
  );
};

export default TrendList;
