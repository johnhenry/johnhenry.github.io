//https://gomakethings.com/converting-a-string-into-markup-with-vanilla-js/
export default (str) =>
  new DOMParser().parseFromString(str, "text/html").body.cloneNode(true)
    .childNodes;
