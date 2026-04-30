import { isArray, isObject } from "./type";

// const error = {
//   error: [
//     { filed: "password", defaultMessage: "비밀번호를 입력해 주세요." },
//     { filed: "email", defaultMessage: "이메일을 입력해 주세요." },
//   ],
//   status: 400,
// };

export const getValidationResult = (error) => {
  if (isArray(error)) {
    const message = {};

    for (let eachError of error) {
      if (isObject(eachError)) {
        if (eachError.filed && eachError.defaultMessage) {
          message[eachError.filed] = eachError.defaultMessage;
          // = {email : "이메일을 입력해 주세요."},
          // {password: "비밀번호를 입력해 주세요."}
        } else {
          return undefined;
        }
      } else {
        return undefined;
      }
    }
    return message;
  }
};
