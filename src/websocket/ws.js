import SockJS from 'sockjs-client';
import Stomp from 'stompjs';
var stompClient = null;

export function connect(subscriberCallback) {
    const socket = new SockJS('http://localhost:4567/tb-websocket');
    stompClient = Stomp.over(socket);
    stompClient.debug = null;
    stompClient.connect({}, frame => {
        console.log('Connected: ' + frame);
        stompClient.subscribe('/topic/incoming-notifications', subscriberCallback);
    });
}

export function disconnect() {
    if (stompClient !== null) {
        stompClient.disconnect();
    }
    console.log("Disconnected");
}

export function sendMessage(message) {
    stompClient.send("/notifications", {}, JSON.stringify(message));
}