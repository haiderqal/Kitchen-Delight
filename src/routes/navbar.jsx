import { Outlet, Link } from "react-router-dom";

const NavBar = () => {
  return (
    <div>
      <div className="navigation">
        <Link to="/">
          <h2 className="nav_element">Kitchen Delight</h2>
        </Link>
        <Link to="/createPost">
          <h4 className="nav_element">Create a new Post</h4>
        </Link>
      </div>
      <Outlet />
    </div>
  );
};

export default NavBar;