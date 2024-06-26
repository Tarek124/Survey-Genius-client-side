import { LuCrown } from "react-icons/lu";
import { Link } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";
import { FaCrown } from "react-icons/fa6";

const Footer = () => {
  const { userRole } = useAuth();
  return (
    <div className="border-t border-[#7f7e7f38] pt-10">
      <footer className="footer p-10 max-w-7xl mx-auto text-base-content">
        <nav>
          <h6 className="footer-title">Services</h6>
          <a className="link link-hover">Branding</a>
          <a className="link link-hover">Design</a>
          <a className="link link-hover">Marketing</a>
          <a className="link link-hover">Advertisement</a>
        </nav>
        <nav>
          <h6 className="footer-title">Company</h6>
          <a className="link link-hover">About us</a>
          <a className="link link-hover">Contact</a>
          <a className="link link-hover">Jobs</a>
          <a className="link link-hover">Press kit</a>
        </nav>
        <nav>
          <h6 className="footer-title">Legal</h6>
          <a className="link link-hover">Terms of use</a>
          <a className="link link-hover">Privacy policy</a>
          <a className="link link-hover">Cookie policy</a>
        </nav>
        <form>
          <h6 className="footer-title">Survey Genius</h6>
          {userRole === "pro-user" ? (
            <p className="btn border rounded shadow-inner">
              <FaCrown className="text-yellow-500 text-xl " /> pro User
            </p>
          ) : (
            <Link to="/payment" className="btn border rounded shadow-inner">
              <LuCrown />
              Try Pro
            </Link>
          )}
        </form>
      </footer>
    </div>
  );
};

export default Footer;
