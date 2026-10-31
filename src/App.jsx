
import React from "react";
import Home from "./components/Home";

const App = () => {
  return (
    <div className="min-h-screen w-full">
      <nav className="fixed top-0 left-5 z-[5] h-[8vh] w-full">
        <div className="mx-auto flex h-full w-[90%] items-center justify-between">
          <div className="name">
            <h3 className="text-[3rem] font-[500] uppercase">
              Monkey D. Luffy
            </h3>
          </div>

          <div className="aboutLink">
            <h3 className="cursor-pointer text-[3rem] font-[500] uppercase">
              About
            </h3>
          </div>
        </div>
      </nav>
      <main className="w-full">
        <Home />
      </main>
      <footer className="h-[10vh] w-full">
        <div className="mx-auto grid h-full w-[90%] grid-cols-3 items-center">
          <div className="flex justify-start">
            <h3 className="text-[1rem] font-[400] uppercase">
              © 2026 Monkey D. Luffy
            </h3>
          </div>

          <div className="flex flex-col items-center">
            <h3 className="cursor-pointer text-[1rem] leading-[1.5]">
              Github
            </h3>
            <h3 className="cursor-pointer text-[1rem] leading-[1.5]">
              LinkedIn
            </h3>
            <h3 className="cursor-pointer text-[1rem] leading-[1.5]">
              Instagram
            </h3>
          </div>
          <div className="flex justify-end">
            <h3 className="cursor-pointer text-[1rem]">
              monkeydluffy841@gmail.com
            </h3>
          </div>

        </div>
      </footer>

    </div>
  );
};

export default App;
