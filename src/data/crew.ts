// Data sourced from IMDB: https://www.imdb.com/title/tt39061476/fullcredits
// Last updated: 2025-12-25

export const IMDB_URL = "https://www.imdb.com/title/tt39061476";
export const IMDB_CREDITS_URL = "https://www.imdb.com/title/tt39061476/fullcredits";

export interface Person {
  name: string;
  imdbId: string;
  role?: string;
  character?: string;
}

export const director: Person = {
  name: "Ivica Vidanovic",
  imdbId: "nm3943006",
  role: "director",
};

export const writers: Person[] = [
  { name: "Bozidar Knezevic", imdbId: "nm13661578", role: "screenplay" },
  { name: "Jelica Kovacevic", imdbId: "nm5347021", role: "story" },
];

export const cast: Person[] = [
  { name: "Jelica Kovacevic", imdbId: "nm5347021", character: "Kaca" },
  { name: "Helena Vukovic", imdbId: "nm8505971", character: "Ana" },
  { name: "Zlatan Vidovic", imdbId: "nm3168810", character: "Stefan" },
  { name: "Mirvad Kuric", imdbId: "nm1375548", character: "Ivan" },
  { name: "Mila Dubonjac", imdbId: "nm17931419", character: "Hana" },
];

export const producers: Person[] = [
  { name: "Vladimir Dukelic", imdbId: "nm1687429", role: "producer" },
  { name: "Zeljko Mitrovic", imdbId: "nm2801226", role: "producer" },
  { name: "Jelica Kovacevic", imdbId: "nm5347021", role: "executiveProducer" },
  { name: "Nevena Savic", imdbId: "nm6344302", role: "executiveProducer" },
  { name: "Ivica Vidanovic", imdbId: "nm3943006", role: "executiveProducer" },
  { name: "Ilija Kovacevic", imdbId: "nm16323980", role: "lineProducer" },
];

export const cinematographer: Person = {
  name: "Eduardo R. Servello",
  imdbId: "nm2665138",
  role: "directorOfPhotography",
};

export const assistantDirectors: Person[] = [
  { name: "Ilija Kovacevic", imdbId: "nm16323980", role: "firstAssistantDirector" },
  { name: "Aleksandar Ivanovic Aladin", imdbId: "nm16650803", role: "secondAssistantDirector" },
  { name: "Lisa Katarina Kovacevic", imdbId: "nm17931921", role: "secondAssistantDirector" },
];

export const productionTeam: Person[] = [
  { name: "Lisa Katarina Kovacevic", imdbId: "nm17931921", role: "finance" },
];

export function getImdbPersonUrl(imdbId: string): string {
  return `https://www.imdb.com/name/${imdbId}`;
}
