export const fetchArticleList = async (pageNo = 0, listSize = 10) => {
  try {
    const fetchResult = await fetch(
      `http://localhost:3737/api/articles?pageNo=${pageNo}&listSize=${listSize}`,
    );
    const listResult = await fetchResult.json();

    return listResult;
    // eslint-disable-next-line no-unused-vars
  } catch (e) {
    return {
      result: { count: 0, result: [] },
      pagination: {},
      error: "서비스가 잠시 중단되었습니다. 이따 시도하셈",
    };
  }
};

export const fetchJsonWebToken = async (email, password) => {
  const fetchResult = await fetch("http://localhost:3737/api/authorization", {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });
  const tokenResult = await fetchResult.json();

  return tokenResult;
};

export const fetchAddArticle = async (jwt, subject, content, attachFile) => {
  try {
    // requestBody 없으면 formData 사용
    // file은 json으로 못 보내서
    const formData = new FormData();
    formData.append("subject", subject);
    formData.append("content", content);
    // attachFile -> FileList 배열
    // FileList 내에 존재하는 파일 객체들을 attachFile로 하나씩 할당
    for (const file of attachFile) {
      formData.append("attachFile", file);
    }

    const fetchResult = await fetch(`http://localhost:3737/api/articles`, {
      method: "post",
      headers: {
        Authorization: jwt,
      },
      body: formData,
    });
    const addResult = await fetchResult.json();

    return addResult;
    // eslint-disable-next-line no-unused-vars
  } catch (e) {
    return {
      result: false,
      error: "서비스가 잠시 중단되었습니다. 이따 시도하셈",
    };
  }
};
