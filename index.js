require('dotenv').config()
const app = require("express")();
const bodyParser = require("body-parser");

app.use(bodyParser.json());

app.get("/webhooks/answer", (req, res) => {
  const ncco = [
    {
      action: "talk",
      bargeIn: true,
      text:
        "Welcome to a talk menu. Press 1 to hear a song, press 2 to hear the current date and time, or press 3 to talk with an agent.",
    },
    {
      action: "input",
      maxDigits: 1,
      eventUrl: [`${req.protocol}://${req.get("host")}/webhooks/dtmf`],
    },
  ];

  res.json(ncco);
});

app.post("/webhooks/events", (req, res) => {
  console.log(req.body);
  res.send(200);
});

app.post("/webhooks/dtmf", (req, res) => {
  let ncco = new Array();
  console.log('pressed', req.body.dtmf);
  switch (req.body.dtmf) {
    case "1":
      ncco.push({
        action: "stream",
        streamUrl: [
          "https://api.freeplaymusic.com/media/downloadable/files/link_samples/media/volume/tracks/American_Pop_Volume_1/h/o/hour_of_the_alley.mp3",
        ],
      });
      break;
    case "2":
      const date = new Date();
      ncco.push({
        action: "talk",
        text: `<speak> 
        Today is 
        <say-as interpret-as="date" format="mdy">${date.getMonth()}/${date.getDate()}/${date.getFullYear()}</say-as>. 
        It is ${date.getHours()} with ${date.getMinutes()} minutes</speak>`,
      });
      break;
    case "3":
      ncco.push({
        action: "talk",
        text:
          "We are connecting you with an agent, who will help you.",
      });
      ncco.push({
        action: "connect",
        eventUrl: [`${req.protocol}://${req.get("host")}/webhooks/events`],
        timeout: "45",
        from: process.env.VIRTUAL_NUMBER,
        endpoint: [
          {
            type: "phone",
            number: process.env.YOUR_NUMBER,
            dtmfAnswer: "2p02p"
          }
        ]
      });
      break;
    default:
      ncco.push({
        action: "talk",
        text: "See you soon!",
      });
      break;
  }

  res.json(ncco);
});

app.listen(3000, () => {
  console.log(`Server running on port 3000`);
});
