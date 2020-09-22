export function hasJSessionId() {
  return document.cookie.indexOf("JSESSIONID") !== -1;
}