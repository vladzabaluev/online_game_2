const btn = document.getElementById("wsTest");
const socket = new WebSocket("ws://localhost:5000/qq");

socket.onopen = () => {
  socket.send(
    JSON.stringify({
      method: "connection",
      userName: "myNameIs",
    })
  );
};

socket.onmessage = (event) => {
  console.log("С сервера пришло сообщение", event.data);
};

btn.onclick = () => {
  socket.send(
    JSON.stringify({
      method: "message",
      userName: "clickName",
    })
  );
};
