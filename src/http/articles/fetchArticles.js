export const fetchArticleList = async (pageNo = 0, listSize = 10) => {
  try {
    const fetchResult = await fetch(
      `http://localhost:3737/api/articles?pageNo=${pageNo}&listSize=${listSize}`,
    );
    const listResult = await fetchResult.json();

    return listResult;
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
export const fetchAddArticle = () => {};
