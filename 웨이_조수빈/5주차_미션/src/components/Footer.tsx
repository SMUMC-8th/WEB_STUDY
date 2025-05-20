import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gray-100 dark:bg-gray-900 py-5 w-full">
      <div className="container mx-auto text-center text-gray-600 dark:text-gray-400">
        &copy;{new Date().getFullYear()} 돌려돌려LP판.All rights reserved.
        <div className="flex justify-center space-x-4 mt-2">
          <Link to={"#"}>Privacy Policy</Link>
          <Link to={"#"}>Terms of Service</Link>
          <Link to={"#"}>Contact</Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;