import SockJS from 'sockjs-client';
import Stomp from 'stompjs';
import settings from '../settings';
import store from '../store/index';
var stompClient = null;

export function connect(subscriberCallback) {
    const socket = new SockJS(`${settings.hostname}/tb-websocket`);
    stompClient = Stomp.over(socket);
    stompClient.debug = null;
    stompClient.connect({}, frame => {
        console.log('Connected: ' + frame);
        stompClient.subscribe('/general', subscriberCallback);
        stompClient.subscribe(`/user/${store.state.Session.userId}/topic/test`, subscriberCallback);
    });
}

export function disconnect() {
    if (stompClient !== null) {
        stompClient.disconnect();
    }
    console.log("Disconnected");
}

export function sendMessage(message) {
    stompClient.send(`/table-resizing/${store.state.Session.userId}`, {}, 'hello');
}