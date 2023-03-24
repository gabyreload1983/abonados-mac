const formMac = document.querySelector("#formMac");
const response = document.querySelector("#response");
const getMac = document.querySelector("#getMac");

getMac.addEventListener("click", () => {});

formMac.addEventListener("submit", (e) => {
  e.preventDefault();
  const obj = {};
  const data = new FormData(formMac);

  data.forEach((value, key) => (obj[key] = value));

  fetch("/api/mac", {
    method: "POST",
    body: JSON.stringify(obj),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((result) => result.json())
    .then((json) => {
      console.log(json);
      if (json.status === "success") {
        response.innerHTML = `
          <h2>Equipo Abonado</h2>
          <p>Cliente: ${json.payload.customer}<p/>
          <p>Terminal: ${json.payload.terminal}<p/>`;
      }
      if (json.status === "error") {
        response.innerHTML = `
        <h2>Equipo NO ABONADO</h2>`;
      }
    });
});
