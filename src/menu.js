const DEFAULT_URL = "http://localhost:8080/automata-websocket"
const DEFAULT_SUB = "/data/sample"

export const MenuHandler = (onSubmit) => {
    const menu = document.querySelector("#menu");
    const btnMenu = document.querySelector("#btnMenu");
    const inpUrl = document.querySelector("#inpUrl");
    const inpSub = document.querySelector("#inpSub");
    const form = document.querySelector("#form");

    inpUrl.value = DEFAULT_URL;
    inpSub.value = DEFAULT_SUB;

    btnMenu.onclick = () => {
        menu.classList.toggle("d-none");
    }

    form.onsubmit = (event) => {
        event.preventDefault();
        if (onSubmit instanceof Function) {
            const url = inpUrl.value.trim();
            const sub = inpSub.value.trim();
            onSubmit(url, sub);
        }
    }
}