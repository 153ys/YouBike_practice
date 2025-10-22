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
              const item = `
                ${site.sna.replace("YouBike2.0_", "")} (${site.sbi}) ${site.ar}
`;
              bikeList.insertAdjacentHTML("beforeend", item)
            })
        })
    }
  })
})