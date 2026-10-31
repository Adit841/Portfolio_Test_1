import React, { useCallback, useState } from "react";
import Three from "./Three.jsx";
import Landing from "./Landing.jsx";
import CardDetails from "./CardDetails.jsx";
import { CARDS } from "../data/cards.js";

const Home = () => {
  const [selected, setSelected] = useState(null);

  const onSelect = useCallback((index) => {
    setSelected(CARDS[index] ?? null);
  }, []);

  const onClose = useCallback(() => {
    setSelected(null);
  }, []);

  return (
    <section className="relative h-full w-full overflow-hidden">
      <Three onSelect={onSelect} onMiss={onClose} />
      <Landing />
      <CardDetails card={selected} onClose={onClose} />
    </section>
  );
};

export default Home;
