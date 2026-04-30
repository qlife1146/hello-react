import {
  fetchAddArticle,
  fetchArticleList,
} from "../../http/articles/fetchArticles";
import ArticleHeader from "./ArticleHeader";
import ArticleList from "./ArticleList";
import ArticleWriter from "./ArticleWriter";
import { useEffect, useState, useRef } from "react";
import ArticleLogin from "./login/ArticleLogin";

const ArticleMain = () => {
  const [viewPageNo, setViewPageNo] = useState(0);
  const [tokenState, setTokenState] = useState("");
  const writeRef = useRef();
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
    if (articleList.error) {
      alert(articleList.error);
    }
    const {
      result: { count, result },
      pagination,
    } = articleList;

    setArticles({ count, result, pagination });
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    refreshArticleList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [viewPageNo]);

  const onAddArticleClickHandler = async (subject, content, attachFile) => {
    const addResult = await fetchAddArticle(
      tokenState,
      subject,
      content,
      attachFile,
    );
    if (addResult.error) {
      writeRef.current.setResponseError(addResult.error);
    } else {
      refreshArticleList();
    }
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
        <ArticleWriter
          onAddArticleClick={onAddArticleClickHandler}
          errorHandleRef={writeRef}
        />
      </div>
    </>
  );
};

export default ArticleMain;
