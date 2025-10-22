document.addEventListener("DOMContentLoaded", () => {
  const keyword = document.querySelector("#searchInput")
  const form = document.querySelector("#searchForm")

  // 監聽表單送出

  form.addEventListener("submit", (e) => {
    e.preventDefault()

    const query = keyword.value.trim()
    
    if (query !== "") {
      const api ="https://tcgbusfs.blob.core.windows.net/dotapp/youbike/v2/youbike_immediate.json"

      fetch(api)
        .then((resp) => resp.json())
        .then((sites) => {
          const bikeList = document.querySelector(".siteList")
          bikeList.innerHTML = ""
          
          sites
            .filter((site) => site.ar.includes(query))
            .forEach((site) => {
              const name = (site.sna || "").replace("YouBike2.0_", "");
              const sbi = Number(site.sbi ?? 0);
              const addr = site.ar ?? "";

              const item =
              `<div class= "bikeListCard">
              <li class="list-group-item fs-5">
              <i class="fa-solid fa-bicycle"></i>
              ${site.sna.replace("YouBike2.0_", "")} (${site.Quantity}) <br>
              <div class= "addStyle">
              ${site.ar}
              </div>
              </li>
              </div>`;

              bikeList.insertAdjacentHTML("beforeend", item)
            })
        })

        .catch((err) => {
          console.error("發生錯誤", err);
      });
    }
  })
})