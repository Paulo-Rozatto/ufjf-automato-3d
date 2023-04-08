const DEFAULT_API = "https://gist.githubusercontent.com/Paulo-Rozatto/fdb0d6df8bc218e48573351d52e975b5/raw/cc84fe582a075697ec6476669ed483123f13b32b/exemplo.json"

export let doc = {}

const menu = document.querySelector("#menu");
const btnMenu = document.querySelector("#btnMenu");
const input = document.querySelector("#inpUrl");
const form = document.querySelector("#form");

input.value = DEFAULT_API;

btnMenu.onclick = () => {
    menu.classList.toggle("d-none");
}

form.onsubmit = (event) => {
    event.preventDefault();
    const http = new XMLHttpRequest();
    const url = input.value.trim();
    http.open("GET", url);
    http.send();

    http.onreadystatechange = (e) => {
        const response = http.responseText || "{}";
        doc = JSON.parse(response);
    }
}