/** @format */

import { useImperativeHandle, useRef, useState } from "react";
import { Alert } from "../ui/Modals";
import { isString } from "../../utils/type";
import { getValidationResult } from "../../utils/errorHandler";

const ArticleWriter = ({ onAddArticleClick, errorHandleRef }) => {
  // const nameRef = useRef();
  // const emailRef = useRef();
  const [addError, setAddError] = useState();

  useImperativeHandle(errorHandleRef, () => {
    return {
      setResponseError(fetchError) {
        if (isString(fetchError)) {
          setAddError(fetchError);
        } else {
          setAddError(getValidationResult(fetchError));
        }
      },
    };
  });

  const subjectRef = useRef();
  const contentRef = useRef();
  const attachFileRef = useRef();

  const alertRef = useRef();

  const [viewMode, setViewMode] = useState("button");

  // 저장을 클릭하면 입력했던 값을 가져와 출력
  const onSaveButtonClickHandler = () => {
    console.log("subjectRef", subjectRef.current.value);
    console.log("contentRef", contentRef.current.value);
    console.log(alertRef);

    if (!subjectRef.current.value) {
      alertRef.current.showModal("제목을");
      return;
    }

    if (!contentRef.current.value) {
      alertRef.current.showModal("내용을");
      return;
    }

    onAddArticleClick(
      subjectRef.current.value,
      contentRef.current.value,
      attachFileRef.current.files, // value는 path를 반환
    );

    subjectRef.current.value = "";
    contentRef.current.value = "";
    attachFileRef.current.value = "";
  };

  const onViewChangeButtonClickHandler = (viewName) => {
    setViewMode(viewName);
  };

  return (
    <div className="article-writer">
      {viewMode === "button" && (
        <button
          type="button"
          onClick={onViewChangeButtonClickHandler.bind(this, "form")}>
          글쓰기
        </button>
      )}
      {viewMode === "form" && (
        <>
          <Alert dialogRef={alertRef} />
          {isString(addError) && <div>{addError}</div>}

          <label htmlFor="subject">제목</label>
          <input type="text" id="subject" ref={subjectRef} />

          <label htmlFor="content">내용</label>
          <textarea id="content" ref={contentRef}></textarea>

          <label htmlFor="content">파일 첨부</label>
          <input
            type="file"
            id="file"
            title="첨부파일"
            ref={attachFileRef}
            multiple
          />
          <button
            type="button"
            className="positive-button"
            onClick={onSaveButtonClickHandler}>
            저장
          </button>
          <button
            type="button"
            className="negative-button"
            onClick={onViewChangeButtonClickHandler.bind(this, "button")}>
            취소
          </button>
        </>
      )}
    </div>
  );
};
export default ArticleWriter;
