import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="flex justify-center gap-6 p-4 bg-white shadow dark:bg-gray-800">
      <Link to="/" className="hover:text-blue-500">Home</Link>
      <Link to="/add-trade" className="hover:text-blue-500">Add Trade</Link>
      <Link to="/analytics" className="hover:text-blue-500">Analytics</Link>
    </nav>
  );
}

export default Navbar;
