const ArticleNewButton = ({ onClick }) => {
  return (
    <button type="button" className="new-button" onClick={onClick}>
      글쓰기
    </button>
  );
};

export default ArticleNewButton;
