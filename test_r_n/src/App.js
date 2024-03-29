import { Route, Routes } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import NotFound from "./pages/NotFound";
import PostPage from "./pages/Post";
import PostsPage from "./pages/Posts";
import routes from "./routes";

function App() {
    const pages = {
        [routes.notFound]: NotFound,
        [routes.home]: PostsPage,
        [routes.post]: PostPage,
    };

    return (
        <>
            <Header />
            <div className="container">
                <Routes>
                    {Object.entries(pages).map(([path, Page]) => (
                        <Route key={path} path={path} element={<Page />} />
                    ))}
                </Routes>
            </div>
        </>
    );
}

export default App;
