import ArticleWriter from "./ArticleWriter";
const ArticleList = ({ articleData }) => {
  return (
    <>
      {articleData.map((article) => (
        <tr key={article.id}>
          <td className="article subject">{article.subject}</td>
          <td className="article content">{article.content}</td>
          <td className="article email">
            {article.membersVO?.email || article.email}
          </td>
          <td className="article viewCnt">{article.viewCnt}</td>
          <td className="article name">{article.crtDt}</td>
        </tr>
      ))}
    </>
  );
};

export default ArticleList;
