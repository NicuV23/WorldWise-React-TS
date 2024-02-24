export const formattedDate = (date: string | Date | null): string => {
  if (!date) {
    return "";
  }

  let parsedDate: Date;

  if (typeof date === "string") {
    parsedDate = new Date(date);
  } else if (date instanceof Date) {
    parsedDate = date;
  } else {
    throw new Error(
      "Invalid date input. Please provide a valid Date object or a string in ISO 8601 format."
    );
  }

  return new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(parsedDate);
};
