import Navbar from "./components/Navbar/Navbar.tsx";
import Login from "./pages/Login/Login";
import { useInitializeApp} from "./hooks/app.hooks.ts";
import "./styles/App.scss";
import RoutesConfig from "./routes/Routes.tsx";

function App() {
    const isLoggedIn: boolean = useInitializeApp();

    // If user is not logged in, show the login page
    if (!isLoggedIn) {
        return <Login />;
    }

    // If user is logged in, show the main application
    return (
        <div className="container">
            <Navbar />
            <div className="content">
                <RoutesConfig />
            </div>
        </div>
    );
}

export default App;

