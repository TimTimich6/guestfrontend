import "./App.css";
import Login from "./Login";
import MainPage from "./MainPage";
import useGuests from "./useGuests";

function App() {
  const { authed } = useGuests();
  return <div className="App">{authed ? <MainPage /> : <Login />}</div>;
}

export default App;
