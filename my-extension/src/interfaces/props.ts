export type page = "/" | "/login" | "/register";

export type props = {
  access_token: string | null;
  redirectPage: (page: page) => void;
};
