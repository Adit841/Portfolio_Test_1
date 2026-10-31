import React from "react";

const facts = [
  { label: "Origin", value: "Foosha Village, East Blue" },
  { label: "Crew", value: "Straw Hat Pirates" },
  { label: "Devil Fruit", value: "Hito Hito no Mi, Model: Nika" },
  { label: "Epithet", value: "Straw Hat Luffy" },
  { label: "Bounty", value: "3,000,000,000 Berries" },
  { label: "Dream", value: "King of the Pirates" },
];

const crew = [
  "Roronoa Zoro",
  "Nami",
  "Usopp",
  "Sanji",
  "Tony Tony Chopper",
  "Nico Robin",
  "Franky",
  "Brook",
  "Jinbe",
];

const About = () => {
  return (
    <section className="relative z-20 min-h-dvh w-full px-5 pb-24 pt-28">
      <div className="mx-auto w-full max-w-3xl">
        <p className="text-sm uppercase tracking-[0.2em] opacity-60">About</p>
        <h2 className="mt-3 text-[clamp(2.5rem,8vw,4.5rem)] font-bold leading-[1.05]">
          Monkey D. Luffy
        </h2>
        <p className="mt-3 text-[clamp(1.1rem,3vw,1.5rem)] leading-snug opacity-80">
          Captain of the Straw Hat Pirates. Future King of the Pirates.
        </p>

        <dl className="mt-12 grid grid-cols-1 gap-x-10 gap-y-6 sm:grid-cols-2">
          {facts.map((fact) => (
            <div key={fact.label}>
              <dt className="text-sm uppercase tracking-wide opacity-50">
                {fact.label}
              </dt>
              <dd className="mt-1 text-lg">{fact.value}</dd>
            </div>
          ))}
        </dl>

        <div className="mt-16 space-y-5 text-base leading-[1.7] sm:text-lg">
          <p>
            Monkey D. Luffy is a rubber-bodied pirate from Foosha Village in the
            East Blue. As a boy he ate the Gomu Gomu no Mi, a Devil Fruit that
            later revealed itself as the Hito Hito no Mi, Model: Nika — the
            Sun God fruit. It made his body rubber and, in time, unlocked the
            warrior of liberation.
          </p>
          <p>
            He is the son of Monkey D. Dragon, leader of the Revolutionary
            Army, and the grandson of Marine hero Monkey D. Garp. He grew up
            with Portgas D. Ace and Sabo as brothers. After Shanks saved him
            from a sea king and left behind the straw hat, Luffy swore he
            would return it only after becoming King of the Pirates.
          </p>
          <p>
            At seventeen he left home, gathered a crew, and set out for the
            Grand Line. The Straw Hats took down Arlong, Crocodile, Enel,
            Rob Lucci, and the world nobles’ hold on Dressrosa. They entered
            the New World, allied with the Heart Pirates and Kid Pirates, and
            brought down Kaido and Big Mom at Wano. After that war Luffy was
            named one of the Four Emperors.
          </p>
          <p>
            He fights with instinct, stretching limbs, Gear transformations,
            and Conqueror’s Haki. He cannot swim. He will still jump in after
            a friend. Meat, freedom, and his crew matter more to him than
            treasure — the One Piece is the road, not the prize.
          </p>
        </div>

        <div className="mt-16">
          <h3 className="text-sm uppercase tracking-[0.2em] opacity-60">
            Straw Hat crew
          </h3>
          <ul className="mt-5 grid grid-cols-1 gap-2 sm:grid-cols-2">
            {crew.map((member) => (
              <li key={member} className="text-lg">
                {member}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default About;
