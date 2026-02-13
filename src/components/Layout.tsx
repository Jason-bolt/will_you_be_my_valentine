import { CiInstagram, CiLinkedin, CiYoutube } from "react-icons/ci";
import { RiTiktokFill } from "react-icons/ri";
import { Link } from "react-router-dom";
import { Outlet } from "react-router-dom";
import { Analytics } from "@vercel/analytics/react";

const Layout = () => {
  return (
    <section className="min-h-screen w-full bg-radial-[at_25%_25%] from-red-700 to-red-900 to-75% text-white">
      <Analytics />
      <Outlet />
      <footer className="flex w-full flex-col items-center justify-center gap-2 border-t-2 border-white/50 py-3">
        <div className="flex items-center justify-center gap-2">
          <Link
            to={"https://www.linkedin.com/in/jason-appiatu/"}
            target="_blank"
          >
            <CiLinkedin className="text-2xl" />
          </Link>
          <Link to={"https://www.instagram.com/appiatu_jason"} target="_blank">
            <CiInstagram className="text-2xl" />
          </Link>
          <Link
            to={"https://www.tiktok.com/@jasonkwameappiatu"}
            target="_blank"
          >
            <RiTiktokFill className="text-xl" />
          </Link>
          <Link to={"https://www.youtube.com/@jasonappiatu"} target="_blank">
            <CiYoutube className="text-2xl" />
          </Link>
        </div>
        <p className="text-xs text-white/60">
          Copyright &copy; {new Date().getFullYear()}. Appiatu Group of
          Companies
        </p>
      </footer>
    </section>
  );
};

export default Layout;
