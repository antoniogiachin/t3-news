import React from "react";

export const TheSearchBar: React.FC = () => {
  return (
    <input
      type="text"
      placeholder="Type here"
      className="input-bordered input-accent input w-full max-w-xs"
    />
  );
};
