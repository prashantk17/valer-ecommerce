import { NavLink } from "react-router-dom";
import { FiPlus, FiList, FiPackage } from "react-icons/fi";

const linkBase =
  "group flex items-center sm:gap-3 px-3 py-2 rounded-md text-sm transition-all duration-200";

const Sidebar = () => {
  return (
    <aside
      className="min-h-screen border-r border-gray-200 bg-white
      w-16 sm:w-64 transition-all duration-300"
    >
      <nav className="pt-10 px-3 sm:px-6 space-y-3">
        {/* Add Items */}
        <NavLink
          to="/add"
          className={(nav) =>
            `${linkBase} ${
              nav.isActive
                ? "text-gray-900 font-medium"
                : "text-gray-500 hover:text-gray-800 hover:bg-gray-100"
            }`
          }
        >
          <FiPlus className="text-lg sm:text-base shrink-0" />
          <span className="hidden sm:inline">Add Items</span>
        </NavLink>

        {/* List Items */}
        <NavLink
          to="/list"
          className={(nav) =>
            `${linkBase} ${
              nav.isActive
                ? "text-gray-900 font-medium"
                : "text-gray-500 hover:text-gray-800 hover:bg-gray-100"
            }`
          }
        >
          <FiList className="text-lg sm:text-base shrink-0" />
          <span className="hidden sm:inline">List Items</span>
        </NavLink>

        {/* Orders */}
        <NavLink
          to="/orders"
          className={(nav) =>
            `${linkBase} ${
              nav.isActive
                ? "text-gray-900 font-medium"
                : "text-gray-500 hover:text-gray-800 hover:bg-gray-100"
            }`
          }
        >
          <FiPackage className="text-lg sm:text-base shrink-0" />
          <span className="hidden sm:inline">Orders</span>
        </NavLink>
      </nav>
    </aside>
  );
};

export default Sidebar;
