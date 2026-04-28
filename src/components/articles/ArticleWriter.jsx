/** @format */

import { useRef, useState } from "react";
import { Alert } from "../ui/Modals";

const ArticleWriter = ({ onAddArticleClick }) => {
  const subjectRef = useRef();
  const nameRef = useRef();
  const emailRef = useRef();
  const contentRef = useRef();

  const alertRef = useRef();

  const [viewMode, setViewMode] = useState("button");

  // 저장을 클릭하면 입력했던 값을 가져와 출력
  const onSaveButtonClickHandler = () => {
    console.log("subjectRef", subjectRef.current.value);
    console.log("nameRef", nameRef.current.value);
    console.log("emailRef", emailRef.current.value);
    console.log("contentRef", contentRef.current.value);

    console.log(alertRef);

    // if (
    //   !subjectRef.current.value ||
    //   !nameRef.current.value ||
    //   !emailRef.current.value ||
    //   !contentRef.current.value
    // ) {
    //   alertRef.current.showModal();
    //   return;
    // }

    if (!subjectRef.current.value) {
      alertRef.current.showModal("제목을");
      return;
    }
    if (!nameRef.current.value) {
      alertRef.current.showModal("이름을");
      return;
    }
    if (!emailRef.current.value) {
      alertRef.current.showModal("이메일을");
      return;
    }
    if (!contentRef.current.value) {
      alertRef.current.showModal("내용을");
      return;
    }

    onAddArticleClick(
      subjectRef.current.value,
      nameRef.current.value,
      emailRef.current.value,
      contentRef.current.value,
    );

    subjectRef.current.value = "";
    nameRef.current.value = "";
    emailRef.current.value = "";
    contentRef.current.value = "";
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

          <label htmlFor="subject">제목</label>
          <input type="text" id="subject" ref={subjectRef} />

          <label htmlFor="name">이름</label>
          <input type="text" id="name" ref={nameRef} />

          <label htmlFor="email">이메일</label>
          <input type="text" id="email" ref={emailRef} />

          <label htmlFor="content">내용</label>
          <textarea id="content" ref={contentRef}></textarea>

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
