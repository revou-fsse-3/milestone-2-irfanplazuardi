import "./App.css";
import WeatherApp from "./component/WeatherApp/WeatherApp";
import { Routes, Route } from "react-router-dom";
import Home from "./component/WeatherApp/Home";
import MainPage from "./layout/MainPage";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route element={<MainPage />}>
          <Route path="/" element={<Home />} />
          <Route path="/weather/:city" element={<WeatherApp />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
