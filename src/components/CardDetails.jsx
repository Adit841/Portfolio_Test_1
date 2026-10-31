import React, { useEffect } from "react";

const CardDetails = ({ card, onClose }) => {
  useEffect(() => {
    const onKey = (event) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  if (!card) return null;

  return (
    <div
      className="pointer-events-none absolute inset-x-0 bottom-0 z-20 flex justify-center px-5 pb-3"
      onPointerDown={(event) => event.stopPropagation()}
    >
      <article
        data-card-details
        className="pointer-events-auto w-full max-w-xl bg-[#1f1f1f] p-4 sm:p-5"
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] opacity-50">
              {card.form}
            </p>
            <h2 className="mt-1 text-[clamp(1.35rem,3.5vw,1.85rem)] font-bold leading-tight">
              {card.title}
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="shrink-0 cursor-pointer text-sm uppercase tracking-wide opacity-70 hover:opacity-100"
          >
            Close
          </button>
        </div>

        <dl className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2">
          <div>
            <dt className="text-xs uppercase tracking-wide opacity-50">When</dt>
            <dd className="mt-1 text-sm">{card.when}</dd>
          </div>
          <div>
            <dt className="text-xs uppercase tracking-wide opacity-50">Power</dt>
            <dd className="mt-1 text-sm">{card.power}</dd>
          </div>
        </dl>

        <p className="mt-3 text-sm leading-relaxed opacity-90">
          {card.about}
        </p>
      </article>
    </div>
  );
};

export default CardDetails;
