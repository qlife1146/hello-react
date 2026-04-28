const TrendSelector = ({ selectors, selectorsKR, active, onToggleClick }) => {
  return (
    <>
      {selectors.map((selector, index) => (
        <button
          key={selector}
          onClick={() => onToggleClick(selector)}
          className={active === selector ? "active" : ""}>
          {selectorsKR[index]}
        </button>
      ))}
    </>
  );
};

export default TrendSelector;
