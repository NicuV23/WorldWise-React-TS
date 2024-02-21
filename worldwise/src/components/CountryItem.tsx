import React from "react";

interface CountryItemProps {
  country: {
    country: string;
    emoji?: string | undefined;
  };
  key: string;
}

function CountryItem({ country, key }: CountryItemProps) {
  return (
    <li key={key}>
      {country.country} {country.emoji && <span>{country.emoji}</span>}
    </li>
  );
}

export default CountryItem;
