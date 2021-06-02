// Connect Menu (top-level) to Hash navigation
const attach = (menu = globalThis.document.getElementById("menu")) => {
  menu.addEventListener(
    "pushed",
    ({ detail: { pushed }, path: [initiator] }) => {
      if (menu === initiator) {
        globalThis.location.hash = pushed;
      }
    }
  );
  menu.addEventListener("popped", ({ path: [initiator] }) => {
    if (menu === initiator) {
      globalThis.location.hash = "";
    }
  });
  const setHash = (
    { oldURL, newURL } = { oldURL: undefined, newURL: undefined }
  ) => {
    if (oldURL === newURL) {
      return;
    }
    menu.push((globalThis.location.hash || "").split("#")[1] || null);
  };
  globalThis.onhashchange = setHash;
  menu.addEventListener(
    "reset",
    () => setHash({ newURL: globalThis.location.hash }),
    { once: true }
  );
};
export default attach;
