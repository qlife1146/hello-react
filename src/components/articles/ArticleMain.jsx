import {
  fetchAddArticle,
  fetchArticleList,
} from "../../http/articles/fetchArticles";
import ArticleHeader from "./ArticleHeader";
import ArticleList from "./ArticleList";
import ArticleWriter from "./ArticleWriter";
import { useEffect, useState, useRef } from "react";
import ArticleLogin from "./login/ArticleLogin";
import { useDispatch, useSelector } from "react-redux";
import { articleAction } from "../../stores/toolkit/slices/articleSlice";

const ArticleMain = () => {
  const [viewPageNo, setViewPageNo] = useState(0);
  const [tokenState, setTokenState] = useState("");
  const writeRef = useRef();
  // const { list: articleList } = useSelector((store) => store.article);
  const storeDispatcher = useDispatch();

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

  const {
    count,
    result: articles,
    pagination: { pageNo = 0, pageCount = 0 },
  } = useSelector((store) => store.article.list);

  const refreshArticleList = async () => {
    const fetchResult = await fetchArticleList(viewPageNo);
    storeDispatcher(articleAction.refresh(fetchResult));

    if (fetchResult.errors) {
      alert(fetchResult.errors);
    }

    storeDispatcher(articleAction.refresh(fetchResult));
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
    if (addResult.errors) {
      writeRef.current.setResponseError(addResult.errors);
    } else {
      const fetchResult = await fetchArticleList(viewPageNo);
      storeDispatcher(articleAction.refresh(fetchResult));
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
