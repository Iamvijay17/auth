import { customAlphabet } from 'nanoid';

export const generateId=(key) => {
  let prefix = key.toLowerCase() + '';
  const nanoid = customAlphabet('1234567890abcdef', 10);
  let id =   prefix+'-' + nanoid().toLowerCase();
  return id;
};

export const getColorFromName = (name) => {
  if (!name || typeof name !== "string") return "#000000"; // Default color for invalid input

  // Generate a hash value based on the entire name
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }

  // Convert the hash to a valid hexadecimal color code
  let color = "#";
  for (let i = 0; i < 3; i++) {
    const value = (hash >> (i * 8)) & 0xff;
    color += value.toString(16).padStart(2, "0"); // Ensure 2-digit hexadecimal
  }

  // Ensure the generated color is a valid 7-character hex code
  if (color.length !== 7) {
    color = "#000000"; // Fallback to default black if length is invalid
  }

  return color;
};