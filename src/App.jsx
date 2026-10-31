import React from "react";
import { Link, Route, Routes, useLocation } from "react-router-dom";
import Home from "./components/Home";
import About from "./components/About";

const App = () => {
  const { pathname } = useLocation();
  const isHome = pathname === "/";

  return (
    <div
      className={
        isHome ? "flex h-dvh w-full flex-col overflow-hidden" : "w-full"
      }
    >
      <nav
        className={`pointer-events-none fixed inset-x-0 top-0 z-30 ${
          isHome ? "bg-transparent" : "bg-[#1f1f1f]"
        }`}
      >
        <div className="pointer-events-auto mx-auto flex w-full items-center justify-between gap-4 px-5 py-4">
          <Link
            to="/"
            className="min-w-0 text-[clamp(1.1rem,3.2vw,2.25rem)] font-medium uppercase leading-tight"
          >
            Monkey D. Luffy
          </Link>
          <Link
            to="/about"
            className="shrink-0 text-[clamp(1.1rem,3.2vw,2.25rem)] font-medium uppercase leading-tight"
          >
            About
          </Link>
        </div>
      </nav>

      <main
        className={
          isHome
            ? "relative z-10 min-h-0 w-full flex-1"
            : "relative z-10 w-full"
        }
      >
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </main>

      <footer
        className={
          isHome
            ? "relative z-20 w-full shrink-0 px-5 py-4"
            : "relative z-20 w-full px-5 py-6"
        }
      >
        <div className="mx-auto flex w-full flex-col items-center gap-3 sm:grid sm:grid-cols-3 sm:items-center sm:gap-4">
          <p className="text-center text-sm font-normal uppercase sm:text-left">
            © 2026 Monkey D. Luffy
          </p>

          <div className="flex items-center justify-center gap-4">
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm leading-normal"
            >
              Github
            </a>
            <a
              href="https://www.linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm leading-normal"
            >
              LinkedIn
            </a>
            <a
              href="https://www.instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm leading-normal"
            >
              Instagram
            </a>
          </div>

          <a
            href="mailto:monkeydluffy841@gmail.com"
            className="break-all text-center text-sm sm:text-right"
          >
            monkeydluffy841@gmail.com
          </a>
        </div>
      </footer>
    </div>
  );
};

export default App;
