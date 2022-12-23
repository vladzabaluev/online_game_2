const express = require("express");
const mongoose = require("mongoose");
const authRouter = require("./routers/authRouter");
const corsMiddleware = require("./middleware/corsMiddleware");

const PORT = process.env.PORT || 5000;

const app = express();
const WSServer = require("express-ws")(app);
const aWSS = WSServer.getWss();

app.use(corsMiddleware);
app.use(express.json());
app.use("/auth", authRouter);
mongoose.set("strictQuery", false);

const start = async () => {
  try {
    await mongoose.connect(`mongodb+srv://Vlad:Zabaluev@cluster0.8nc1ovd.mongodb.net/online_game?retryWrites=true&w=majority`);
    app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
  } catch (e) {
    console.log(e);
  }
};

app.ws("/:id", (ws, req) => {
  ws.send("Ты успешно подключился");

  ws.on("message", (msg) => {
    msg = JSON.parse(msg);
    console.log(`Сообщение пришло `);
    switch (msg.method) {
      case "connection":
        connectionHandler(ws, msg);
        break;
      case "StartCountdown":
        console.log("Обратный отсчет начался");
        let timer = msg.timer;

        sendTimerValue(ws, msg, timer);

        break;
      case "GameOver":
        console.log("Игра окончена");
        // if (!users.includes(msg.user)) {
        //   users.push(msg.user);
        //   results.push(msg.result);
        // }

        console.log(msg.user);
        console.log(msg.result);
        break;
      case "StartGame":
        console.log("Игра началась");
        sendGameTimerValue(ws, msg, msg.timer);
        break;
      case "Reload":
        reload(ws, msg);
        break;
    }
  });
});

start();

connectionHandler = (ws, msg) => {
  ws.id = msg.id;
  broadcastHandler(ws, msg);
};

broadcastHandler = (ws, msg) => {
  aWSS.clients.forEach((client) => {
    if (client.id === msg.id) {
      //  client.send(`Пользователь с именем ${msg.userName} подключился`);
    }
  });
};

sendTimerValue = (ws, msg, timer) => {
  aWSS.clients.forEach((client) => {
    if (client.id === msg.id) {
      client.send(
        JSON.stringify({
          method: "TimeValueChanged",
          newTimerValue: timer,
        })
      );
    }
  });
  timer--;
  let timeout = setTimeout(() => {
    sendTimerValue(ws, msg, timer);
  }, 1000);

  if (timer < 0) {
    clearTimeout(timeout);
    sendStartGame(ws, msg);

    //  isGamePlaying = true;
  }
};

sendStartGame = (ws, msg) => {
  aWSS.clients.forEach((client) => {
    if (client.id === msg.id) {
      client.send(
        JSON.stringify({
          method: "StartGame",
        })
      );
    }
  });
};

sendGameTimerValue = (ws, msg, timer) => {
  aWSS.clients.forEach((client) => {
    if (client.id === msg.id) {
      client.send(
        JSON.stringify({
          method: "TimeValueChanged",
          newTimerValue: timer,
        })
      );
    }
  });
  timer--;
  let timeout = setTimeout(() => {
    sendGameTimerValue(ws, msg, timer);
  }, 1000);

  if (timer < 0) {
    clearTimeout(timeout);
    finishGame(ws, msg);

    //  isGamePlaying = true;
  }
};

finishGame = (ws, msg) => {
  aWSS.clients.forEach((client) => {
    if (client.id === msg.id) {
      client.send(
        JSON.stringify({
          method: "FinishGame",
        })
      );
    }
  });
};

reload = (ws, msg) => {
  aWSS.clients.forEach((client) => {
    if (client.id === msg.id) {
      client.send(
        JSON.stringify({
          method: "ReloadPage",
        })
      );
    }
  });
};
