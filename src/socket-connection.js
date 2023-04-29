import SockJS from "sockjs-client";
import { Stomp } from "@stomp/stompjs";

let stompClient = null;

export function connect(
    url = "http://localhost:8080/automata-websocket",
    sub = "/data/sample",
    callback = console.log
) {
    const socket = new SockJS(url);
    stompClient = Stomp.over(socket);

    stompClient.connect({}, (frame) => {
        stompClient.subscribe(sub, (data) => {
            const content = JSON.parse(data.body).content;
            callback(content);
        });
    });
}

export function disconnect() {
    if (stompClient !== null) {
        stompClient.disconnect();
    }
    console.log("Disconnected");
}

export function send(endpoint, data) {
    stompClient.send(endpoint, {}, JSON.stringify(data));
}