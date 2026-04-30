import { useRef, useState } from "react";
import { fetchJsonWebToken } from "../../../http/articles/fetchArticles";
import { Alert } from "../../ui/Modals";
import { isString } from "../../../utils/type";
import { getValidationResult } from "../../../utils/errorHandler";

const ArticleLogin = ({ onLoginSuccess }) => {
  const [loginErrors, setLoginErrors] = useState();
  const emailRef = useRef();
  const passwordRef = useRef();
  const alertRef = useRef();
  const onLoginBUttonClickHandler = async () => {
    if (!emailRef.current.value) {
      alertRef.current.showModal("이메일을");
      return;
    }
    if (!passwordRef.current.value) {
      alertRef.current.showModal("이메일을");
      return;
    }

    const loginResult = await fetchJsonWebToken(
      emailRef.current.value,
      passwordRef.current.value,
    );

    onLoginSuccess(loginResult.token);

    if (loginResult.error) {
      if (isString(loginResult.error)) {
        setLoginErrors(loginResult.error);
      } else {
        setLoginErrors(getValidationResult(loginResult.error));
      }
    }
  };

  return (
    <div>
      {isString(loginErrors) && <div>{loginErrors}</div>}
      <Alert dialogRef={alertRef} />
      <div>
        <label htmlFor="email">이메일</label>
        <input type="email" id="email" ref={emailRef} />
        {loginErrors?.email && <div>{loginErrors.email}</div>}
      </div>
      <div>
        <label htmlFor="w">비밀번호</label>
        <input type="password" id="password" ref={passwordRef} />
        {loginErrors?.password && <div>{loginErrors.password}</div>}
      </div>
      <button type="button" onClick={onLoginBUttonClickHandler}>
        로그인
      </button>
    </div>
  );
};

export default ArticleLogin;
