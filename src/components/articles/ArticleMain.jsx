import { fetchArticleList } from "../../http/articles/fetchArticles";
import ArticleHeader from "./ArticleHeader";
import ArticleList from "./ArticleList";
import ArticleWriter from "./ArticleWriter";
import { useEffect, useState } from "react";
import ArticleLogin from "./login/ArticleLogin";

const ArticleMain = () => {
  const [viewPageNo, setViewPageNo] = useState(0);
  const [tokenState, setTokenState] = useState("");
  console.log(viewPageNo);

  const onPaginationButtonClickHandler = (nextPageNo) => {
    setViewPageNo(nextPageNo);
  };

  const onLoginSuccessHandler = (token) => {
    setTokenState((prevToken) => {
      prevToken = token;
      return prevToken;
    });
    console.log("Success:", token);
  };

  // useEffect(() => {
  //   if (!tokenState) {
  //     return;
  //   }
  //   console.log("tokenState:", tokenState);
  // }, [tokenState]);

  const [
    {
      count,
      result: articles,
      pagination: { pageNo = 0, pageCount = 0 },
    },
    setArticles,
  ] = useState({
    count: 0,
    result: [],
    pagination: {},
  });

  const refreshArticleList = async () => {
    const articleList = await fetchArticleList(viewPageNo);
    const {
      result: { count, result },
      pagination,
    } = articleList;

    setArticles({ count, result, pagination });

    if (articleList.error) {
      alert(articleList.error);
    }
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    refreshArticleList();
  }, [viewPageNo]);

  const onAddArticleClickHandler = (subject, name, email, content) => {
    setArticles((prevData) => [
      ...prevData,
      {
        id: prevData.length + 1,
        subject,
        content,
        email,
        viewCnt: parseInt(Math.random() * 10000),
        crtDt: "2026-01-01",
        mdfyDt: null,
        fileGroupId: null,
        membersVO: { email, name },
        files: [],
      },
    ]);
  };

  return (
    <>
      {!tokenState && <ArticleLogin onLoginSuccess={onLoginSuccessHandler} />}
      <div className="wrapper">
        <div>{count}개의 게시글이 검색되었습니다.</div>
        <table>
          <ArticleHeader />
          <tbody>
            <ArticleList contents={articles} />
          </tbody>
        </table>
        <div>
          {pageNo > 0 && (
            <button
              onClick={onPaginationButtonClickHandler.bind(this, pageNo - 1)}>
              이전
            </button>
          )}
          {pageNo === 0 && pageCount - 1 > pageNo && (
            <button
              onClick={onPaginationButtonClickHandler.bind(this, pageNo + 1)}>
              다음
            </button>
          )}
        </div>
        <ArticleWriter onAddArticleClick={onAddArticleClickHandler} />
      </div>
    </>
  );
};

export default ArticleMain;
