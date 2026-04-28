import TrendContext from "./contexts/TrendContext";
const TrendBox = ({ children }) => {
  const providerProps = { componentName: "TrendBox" };
  return (
    <ul className="trend-box">
      <TrendContext.Provider value={providerProps}>
        {children}
      </TrendContext.Provider>
    </ul>
  );
};

export default TrendBox;
