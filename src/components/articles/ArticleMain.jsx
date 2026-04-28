import ArticleHeader from "./ArticleHeader";
import articleData from "./articles.json";
import ArticleList from "./ArticleList";
import ArticleWriter from "./ArticleWriter";
import { useState } from "react";

const ArticleMain = () => {
  const [articles, setArticles] = useState(articleData.articles);

  const onAddArticleClickHandler = (subject, name, email, content) => {
    const lpad = (str, length, defaultCharacter) => {
      const remainLength = length - (str + "").length;
      return defaultCharacter.repeat(remainLength) + str;
    };

    const getDateTime = (format) => {
      const now = new Date();

      return format
        .replaceAll("YYYY", now.getFullYear())
        .replaceAll("MM", lpad(now.getMonth() + 1, 2, "0"))
        .replaceAll("DD", lpad(now.getDate(), 2, "0"))
        .replaceAll("HH", lpad(now.getHours(), 2, "0"))
        .replaceAll("mm", lpad(now.getMinutes(), 2, "0"))
        .replaceAll("ss", lpad(now.getSeconds(), 2, "0"));
    };

    const makeId = (index) => {
      const seq = lpad(index, 6, "0");
      return `BO-${getDateTime("YYYYMMDD-")}${seq}`;
    };

    setArticles((prevData) => [
      ...prevData,
      {
        id: makeId(prevData.length + 1),
        subject,
        content,
        email,
        viewCnt: parseInt(Math.random() * 10000),
        crtDt: getDateTime("YYYY-MM-DD HH:mm:ss"),
        mdfyDt: null,
        fileGroupId: null,
        membersVO: { email, name },
        files: [],
      },
    ]);
  };

  return (
    <div className="wrapper">
      <table>
        <colgroup>
          <col width={"25%"} />
          <col width={"25%"} />
          <col width={"10%"} />
          <col width={"10%"} />
          <col width={"10%"} />
        </colgroup>
        <ArticleHeader />
        <tbody>
          <ArticleList articleData={articles} />
        </tbody>
      </table>
      <ArticleWriter onAddArticleClick={onAddArticleClickHandler} />
    </div>
  );
};

export default ArticleMain;
