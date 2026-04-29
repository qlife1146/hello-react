import { useRef } from "react";
import { fetchJsonWebToken } from "../../../http/articles/fetchArticles";
const ArticleLogin = ({ onLoginSuccess }) => {
  const emailRef = useRef();
  const passwordRef = useRef();

  const onLoginBUttonClickHandler = async () => {
    const loginResult = await fetchJsonWebToken(
      emailRef.current.value,
      passwordRef.current.value,
    );

    if (loginResult.error) {
      alert(loginResult.error);
      return;
    }

    onLoginSuccess(loginResult.token);
  };

  return (
    <div>
      <label>이메일</label>
      <input type="text" id="email" ref={emailRef} />
      <label>비밀번호</label>
      <input type="password" id="password" ref={passwordRef} />
      <button type="button" onClick={onLoginBUttonClickHandler}>
        로그인
      </button>
    </div>
  );
};

export default ArticleLogin;
