const ORDER = {
  desc: "desc",
  asc: "asc",
} as const;
export type ORDER = typeof ORDER[keyof typeof ORDER];

const SORT = {
  week: "week",
  votes: "votes",
  activity: "activity",
  creation: "creation",
} as const;
export type SORT = typeof SORT[keyof typeof SORT];
