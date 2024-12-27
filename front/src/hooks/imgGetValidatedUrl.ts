export const getValidatedUrl = (url: string) =>
  url.startsWith("http") ? url : `https://dev.admin13.uz${url}`;
