import { Outlet } from "react-router-dom";

const MainPage = () => {
  return (
    <div className="container">
      <Outlet />
    </div>
  );
};

export default MainPage;
