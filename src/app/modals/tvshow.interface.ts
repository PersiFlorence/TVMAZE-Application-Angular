export interface TvShows {
  id: number;
  url: string;
  name: string;
  type: string;
  language: string;
  genres: string[];
  status: string;
  runtime: number;
  premiered: string;
  officialSite: string;
  schedule: TVSchedule;
  rating: TVRating;
  weight: number;
  network: TVNetwork;
  webChannel?: any;
  externals: TVExternals;
  image: TVImage;
  summary: string;
  updated: number;
  _links: TVlinks;
}
export interface TVlinks {
  self: TVSelf;
  previousepisode: TVSelf;
}
export interface TVSelf {
  href: string;
}
export interface TVImage {
  medium: string;
  original: string;
}
export interface TVExternals {
  tvrage: number;
  thetvdb: number;
  imdb: string;
}
export interface TVNetwork {
  id: number;
  name: string;
  country: TVCountry;
}
export interface TVCountry {
  name: string;
  code: string;
  timezone: string;
}
export interface TVRating {
  average: number;
}
export interface TVSchedule {
  time: string;
  days: string[];
}