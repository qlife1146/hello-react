import ArticleHeader from "./ArticleHeader";
import articleData from "./articles.json";
import ArticleList from "./ArticleList";
import ArticleWriter from "./ArticleWriter";
import { useState } from "react";
import ArticleNewButton from "./ArticleNewButton";

const ArticleMain = () => {
  const [cachedData, setCachedData] = useState(articleData.articles);
  const [
    {
      subject,
      membersVO: { name, email },
      content,
      view: viewCnt,
      crtDt,
    },
    setNewData,
  ] = useState({
    subject: "",
    membersVO: { name: "", email: "" },
    content: "",
    viewCnt: 0,
    crtDt: "",
  });
  const onSubjectChangeHandler = (e) => {
    console.log(e.target.value);
    setNewData((prevData) => ({
      ...prevData,
      subject: e.target.value,
    }));
  };
  const onNameChangeHandler = (e) => {
    console.log(e.target.value);
    setNewData((prevData) => ({
      ...prevData,
      membersVO: {
        ...prevData.membersVO,
        name: e.target.value,
      },
    }));
  };
  const onEmailChangeHandler = (e) => {
    console.log(e.target.value);
    setNewData((prevData) => ({
      ...prevData,
      membersVO: {
        ...prevData.membersVO,
        email: e.target.value,
      },
    }));
  };
  const onContentChangeHandler = (e) => {
    console.log(e.target.value);
    setNewData((prevData) => ({
      ...prevData,
      content: e.target.value,
    }));
  };
  const onNegativeClickHandler = () => {
    console.log("clicked negative button");
    setNewData({
      subject: "",
      membersVO: {
        name: "",
        email: "",
      },
      content: "",
    });
    setShowWriter((prevData) => {
      prevData = false;
      return prevData;
    });
    console.log(subject + ", " + name + ", " + email + ", " + content);
  };
  const onPositiveClickHandler = () => {
    const today = new Date();
    const formattedDate = `${today.getFullYear()}-${(today.getMonth() + 1).toString().padStart(2, "0")}-${today.getDate().toString().padStart(2, "0")} ${today.getHours().toString().padStart(2, "0")}:${today.getMinutes().toString().padStart(2, "0")}:${today.getSeconds().toString().padStart(2, "0")}`;
    console.log(today);
    if (subject === "" || name === "" || email === "" || content === "") {
      return;
    }

    setCachedData((prevData) => [
      ...prevData,
      {
        id: prevData.length,
        subject,
        membersVO: {
          name,
          email,
        },
        content,
        viewCnt: 0,
        crtDt: formattedDate,
      },
    ]);

    setNewData({
      subject: "",
      membersVO: {
        name: "",
        email: "",
      },
      content: "",
    });
  };

  const [showWriter, setShowWriter] = useState(false);

  const onNewButtonClickHandler = () => {
    setShowWriter((prevData) => {
      // true = show writer
      prevData = true;
      return prevData;
    });
    console.log(showWriter);
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
          <ArticleList
            //  articleData={articleData.articles}
            articleData={cachedData}
          />
        </tbody>
      </table>
      {!showWriter && <ArticleNewButton onClick={onNewButtonClickHandler} />}
      {showWriter && (
        <ArticleWriter
          inputData={{ subject, name, email, content, viewCnt, crtDt }}
          onSubjectChange={onSubjectChangeHandler}
          onNameChange={onNameChangeHandler}
          onEmailChange={onEmailChangeHandler}
          onContentChange={onContentChangeHandler}
          onNegativeClick={onNegativeClickHandler}
          onPositiveClick={onPositiveClickHandler}
        />
      )}
    </div>
  );
};

export default ArticleMain;
