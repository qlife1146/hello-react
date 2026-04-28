import { useContext } from "react";
import TrendContext from "./contexts/TrendContext";

const TrendItem = ({ item }) => {
  const { componentName } = useContext(TrendContext);
  if (!componentName || componentName !== "TrendBox") {
    return <></>;
  }
  const { id, poster, name, openDate } = item;

  return (
    <li className="trend-item" id={id}>
      <img src={poster} alt="" />
      <span>{name}</span>
      <span>{openDate}</span>
    </li>
  );
};

export default TrendItem;
