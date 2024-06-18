import { FaList, FaPlus, FaPlay, FaStop, FaCog } from "react-icons/fa";
import { FaX } from "react-icons/fa6";

const getMenuIcon = (icon) => {
	switch (icon) {
		case "home":
			return <FaList />;
		case "add":
			return <FaPlus />;
		case "active":
			return <FaPlay />;
		case "completed":
			return <FaStop />;
		case "settings":
			return <FaCog />;
		case "delete":
			return <FaX />;
		default:
			return null;
	}
};

export default getMenuIcon;
