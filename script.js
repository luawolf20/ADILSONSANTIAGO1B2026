let units = [];
let favorites = JSON.parse(localStorage.getItem("fav")) || [];

const grid = document.getElementById("grid");
const search = document.getElementById("search");
const filter = document.getElementById("filter");

fetch("data/units.json")
.then(r => r.json())
.then(data => {
    units = data;
    render(data);
});

/* RENDER */
function render(list){
    grid.innerHTML = "";

    list.forEach(u => {

        const isFav = favorites.includes(u.id);

        grid.innerHTML += `
        <div class="card">

            <div class="fav" onclick="toggleFav('${u.id}')">
                ${isFav ? "❤️" : "🤍"}
            </div>

            <img src="${u.image}">
            <h3>${u.name}</h3>

            <div class="badge">
                ${u.rarity} • ${u.type}
            </div>

            <div class="badge">
                Tier: ${u.tier || "?"}
            </div>

            <a href="unit.html?id=${u.id}">Ver detalhes</a>

        </div>
        `;
    });
}

/* SEARCH + FILTER */
function apply(){
    const text = search.value.toLowerCase();
    const rarity = filter.value;

    const filtered = units.filter(u =>
        u.name.toLowerCase().includes(text) &&
        (rarity === "all" || u.rarity === rarity)
    );

    render(filtered);
}

search.addEventListener("input", apply);
filter.addEventListener("change", apply);

/* FAVORITOS */
function toggleFav(id){

    if(favorites.includes(id)){
        favorites = favorites.filter(f => f !== id);
    } else {
        favorites.push(id);
    }

    localStorage.setItem("fav", JSON.stringify(favorites));
    apply();
}