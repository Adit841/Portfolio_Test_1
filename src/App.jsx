import React from "react";
import Home from "./components/Home";

const App = () => {
  return (
    <div id="top" className="flex h-dvh w-full flex-col overflow-hidden">
      <nav className="pointer-events-none fixed inset-x-0 top-0 z-30">
        <div className="pointer-events-auto mx-auto flex w-full items-center justify-between gap-4 px-5 py-4">
          <a
            href="#top"
            className="min-w-0 text-[clamp(1.1rem,3.2vw,2.25rem)] font-medium uppercase leading-tight"
          >
            Monkey D. Luffy
          </a>
          <a
            href="#about"
            className="shrink-0 text-[clamp(1.1rem,3.2vw,2.25rem)] font-medium uppercase leading-tight"
          >
            About
          </a>
        </div>
      </nav>

      <main className="relative z-10 min-h-0 w-full flex-1">
        <Home />
      </main>

      <footer className="relative z-20 w-full shrink-0 px-5 py-4">
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
