import { useSelector } from "react-redux";
import "./Home.css"

const Home = () => {
  const { name } = useSelector((state) => state.data);

  return (
    <div className="home d-flex align-items-center justify-content-center">
      <div className="container text-center">
        <h2>Home Page</h2>
        <p>Welcome to the <b>Home</b> page</p>
        <p>This page has <b>Redux Toolkit</b> set up.</p>
        <p>The name: <b>{name}</b> is stored in the dataSlice</p>
      </div>
    </div>
  );
};

export default Home;
