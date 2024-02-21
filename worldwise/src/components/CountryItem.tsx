import React from "react";

interface CountryItemProps {
  country: {
    country: string;
    emoji?: string | undefined;
  };
  key: string;
}

const CountryItem: React.FC<CountryItemProps> = ({ country, key }) => {
  return (
    <li key={key}>
      {country.country} {country.emoji && <span>{country.emoji}</span>}
    </li>
  );
};

export default CountryItem;
