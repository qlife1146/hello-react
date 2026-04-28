import { useState } from "react";
import TrendBox from "./TrendBox";
import TrendHeader from "./TrendHeader";
import TrendList from "./TrendList";
import TrendSelector from "./TrendSelector";
import trendData from "./trend.json";
import TrendItem from "./TrendItem";
const TrendMain = () => {
  const [{ sectionName, selectorsKR, selectors, items }] = useState(trendData);
  const [active, setActive] = useState(selectors[0]);
  // active=selectors
  //items["active"]
  const onToggleClickHandler = (selector) => {
    // trend.json의 selectors로 토글이 되며 버튼 타이틀은 selectorsKR과 매칭
    setActive(selector);
    console.log(selector);
  };

  return (
    <TrendBox>
      <TrendHeader />
      <h1>{sectionName}</h1>
      <div className="button">
        <TrendSelector
          selectors={selectors}
          selectorsKR={selectorsKR}
          active={active}
          onToggleClick={onToggleClickHandler}
        />
      </div>
      <TrendList>
        <ul className="trend-list">
          {items[active].map((item) => (
            <TrendItem key={item.id} item={item} />
          ))}
        </ul>
      </TrendList>
    </TrendBox>
  );
};

export default TrendMain;
