import fetch from "node-fetch";
import http from "http";

const DATE = ["2023", "10", "19"];
const LEO_MOVIE_ID = "rur_1kciu";
const LEO_TICKET_LINK = `https://apiproxy.paytm.com/v3/movies/search/movie?meta=1&reqData=1&city=chennai&movieCode=${LEO_MOVIE_ID}&date=${DATE.join(
  "-"
)}&version=3&site_id=6&channel=HTML5&child_site_id=370`;

const playSound = () => {
  const sound = new Audio();
  sound.src = "./light-hearted-message-tone.mp3";
  sound.load();
  sound.play();
};

const fetchBookings = async () => {
  const response = await fetch(`${LEO_TICKET_LINK}`);
  const data = await response.json();
  return data.meta.cinemas.map((cinema) => ({
    name: cinema.name,
    id: cinema.id,
  }));
};

const server = http.createServer(async (req, res) => {
  if (req.method === "GET" && req.url === "/") {
    const data = await fetchBookings();
    // res.writeHead(200);
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "*");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");
    res.write(JSON.stringify(data));
    res.end();
  }
});

server.listen(3001);
