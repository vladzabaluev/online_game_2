const express = require("express");
const mongoose = require("mongoose");
const authRouter = require("./routers/authRouter");
const corsMiddleware = require("./middleware/corsMiddleware");
const { getUsers } = require("./controllers/authController");

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
var results = [];
var users = [];
var testA = [];
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
        if (!users.includes(msg.user)) {
          users.push(msg.user);
          results.push(msg.result);
          testA.push({
            userName: msg.user,
            result: msg.result,
          });
        }
        if (testA.length * testA.length == getUsersCount(ws, msg)) {
          sortResults(ws, msg);

          break;
        }
        // console.log(msg.user);
        // console.log(msg.result);
        break;
      case "StartGame":
        console.log("Игра началась");
        sendGameTimerValue(ws, msg, msg.timer);
        break;
      case "Reload":
        reload(ws, msg);

        results = [];
        users = [];

        testA = [];
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

function getUsersCount(ws, msg) {
  let userCount = 0;
  aWSS.clients.forEach((client) => {
    if (client.id === msg.id) {
      userCount++;
    }
  });
  console.log(`Количество пользователей в узле: ${userCount}`);

  return userCount;
}

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

sortResults = (ws, msg) => {
  // function compareNumeric(a, b) {
  //   if (a > b) return 1;
  //   if (a == b) return 0;
  //   if (a < b) return -1;
  // }
  // results.sort(compareNumeric);
  // console.log("Отсортированный массив");
  var maxValue = -1;
  let winnerName;
  testA.forEach((element) => {
    if (element.result > maxValue) {
      maxValue = element.result;
      winnerName = element.userName;
    }
  });
  console.log(winnerName);
  aWSS.clients.forEach((client) => {
    if (client.id === msg.id) {
      client.send(
        JSON.stringify({
          method: "ShowFinalResult",
          userName: winnerName,
          winnerCliCkCount: maxValue,
        })
      );
    }
  });
};
