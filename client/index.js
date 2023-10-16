const SERVER_LINK = "http://localhost:3001";

const playSound = () => {
  // document.getElementById("sample").click()
  const sound = new Audio();
  sound.src = "./light-hearted-message-tone.mp3";
  sound.load();
  sound.play();
};

const fetchBookings = async () => {
  const myExpectedCinema = [
    4143, 5163, 4891, 3952, 107, 7589, 7835, 10184, 10186, 294, 300, 16, 10185,
    10183, 2879, 4941, 9505, 51767, 55990, 1007116, 1007117, 1007118, 1007119,
    1007120,
  ];
  setInterval(async () => {
    try {
      const response = await fetch(SERVER_LINK);
      const data = await response.json();
      const filteredCinema = data.filter((d) => {
        if (myExpectedCinema.includes(d.id)) {
          return true;
        }
        return false;
      });
      if (filteredCinema.length > 0) {
        playSound();
      }
      console.log(filteredCinema);
      console.log(data);
    } catch (e) {
      console.log("SOMETHING WRONG");
    }
  }, 900000);
};

(async () => {
  await fetchBookings();
})();
