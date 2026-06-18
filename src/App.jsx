import { useEffect, useState } from "react";
import ArticleMain from "./components/articles/ArticleMain.jsx";
import CCMain from "./components/CounterCalculator.jsx";
import TodoMain from "./components/todo/TodoMain.jsx";
import TrendMain from "./components/trend/TrendMain.jsx";
import { ToolkitProvider } from "./stores/toolkit/ToolkitProvider";
// import { ReactReduxProvider } from "./stores/redux/ReactReduxProvider.jsx";

const MENU_ITEMS = ["trend", "todo", "articles"];

const getCurrentPage = () => {
  const page = window.location.hash.slice(1);

  return MENU_ITEMS.includes(page) ? page : "trend";
};

export default function App() {
  const [currentPage, setCurrentPage] = useState(getCurrentPage);

  useEffect(() => {
    const handleHashChange = () => {
      setCurrentPage(getCurrentPage());
    };

    window.addEventListener("hashchange", handleHashChange);

    return () => {
      window.removeEventListener("hashchange", handleHashChange);
    };
  }, []);
  // return <TrendMain />;
  return (
    <ToolkitProvider>
      <main className="main-container">
        <header>
          <nav className="menu-navigation" aria-label="주요 메뉴">
            <ul>
              {MENU_ITEMS.map((menu) => (
                <li key={menu}>
                  <a
                    href={`#${menu}`}
                    className={currentPage === menu ? "active" : undefined}
                    aria-current={currentPage === menu ? "page" : undefined}>
                    {menu}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </header>

        {currentPage === "trend" && <TrendMain />}
        {currentPage === "todo" && <TodoMain />}
        {currentPage === "articles" && <ArticleMain />}
      </main>
    </ToolkitProvider>
  );
  // return <CCMain />;
}

// export default App;
