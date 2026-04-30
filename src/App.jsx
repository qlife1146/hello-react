import ArticleMain from "./components/articles/ArticleMain.jsx";
import CCMain from "./components/CounterCalculator.jsx";
import TodoMain from "./components/todo/TodoMain.jsx";
import TrendMain from "./components/trend/TrendMain.jsx";
import { ToolkitProvider } from "./stores/toolkit/ToolkitProvider";
// import { ReactReduxProvider } from "./stores/redux/ReactReduxProvider.jsx";
export default function App() {
  // <ArticleMain />;
  // return <TrendMain />;
  return (
    <ToolkitProvider>
      <TodoMain />;
    </ToolkitProvider>
  );
  // return <CCMain />;
}

// export default App;
