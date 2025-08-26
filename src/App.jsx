import { set } from "mongoose";
import React, { useEffect, useState } from "react";

function App() {
  // Use State
  const [hideDiv, setHideDiv] = useState(false);
  const [input, setInput] = useState("");
  const [city, setCity] = useState("");
  const [data, setData] = useState(null);
  const [date, setDate] = useState(new Date());
  const [todayDate, setTodayDate] = useState("");
  const [tomorrowDate, setTomorrowDate] = useState("");
  const [dayAfterDate, setDayAfterDate] = useState("");
  const [symbol, setSymbol] = useState("❔");

  // Submit Function
  function submit() {
    setHideDiv(true);
    setCity(input);
    // Format date as DD-MM-YYYY
    const formattedDate = `${date.getDate()}-${
      date.getMonth() + 1
    }-${date.getFullYear()}`;
    setDate(formattedDate);
  }
  // Use Effect
  useEffect(() => {
    const fetchData = async () => {
      let url = `https://wttr.in/${input}?format=j1`;
      try {
        const response = await fetch(url);
        let jsonData = await response.json();
        console.log("Data ", data);
        setData(jsonData);
      } catch (err) {
        console.log("Err: ", err);
      }
    };
    fetchData();
  }, [city]);

  // Use Effect for Date:
  useEffect(() => {
    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];

    // ✅ Today
    const today = new Date();
    const todayStr = `${months[today.getMonth()]} ${today.getDate()}`;
    setTodayDate(todayStr);

    // ✅ Tomorrow
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const tomorrowStr = `${months[tomorrow.getMonth()]} ${tomorrow.getDate()}`;
    setTomorrowDate(tomorrowStr);

    // ✅ Day After Tomorrow
    const dayAfter = new Date();
    dayAfter.setDate(dayAfter.getDate() + 2);
    const dayAfterStr = `${months[dayAfter.getMonth()]} ${dayAfter.getDate()}`;
    setDayAfterDate(dayAfterStr);
  }, []);

  // Use Effect for Symbol ☁🌧🌨🌩⛅🌤
  useEffect(() => {
    if (!data || !data.current_condition) return;

    const weather = data.current_condition[0].weatherDesc[0].value;
    const weatherText = weather.toLowerCase();

    if (weatherText.includes("cloudy")) {
      setSymbol("☁");
    } else if (weatherText.includes("rain")) {
      setSymbol("🌧");
    } else if (weatherText.includes("thunder")) {
      setSymbol("🌩");
    } else if (weatherText.includes("sun") || weatherText.includes("clear")) {
      setSymbol("☀");
    } else if (weatherText.includes("snow")) {
      setSymbol("❄");
    } else if (weatherText.includes("fog") || weatherText.includes("haze")) {
      setSymbol("🌫");
    }else {
      setSymbol("🌤"); // default
    }
  }, [data]); // 👈 runs every time "data" updates

  return (
    <>
      {/* Input With Button */}
      <div className="container  w-full h-dvh pt-12">
        <div className="main d-flex text-center bg-gradient-to-t from-[#346a89bb] to-[#99c9e7dc] w-125 h-158 rounded-2xl m-auto">
          <div className="main-div">
            <input
              type="text"
              placeholder="Search City"
              className="w-110 rounded-2xl p-3 bg-[#638b9dca] px-7 text-blue-50 mt-10 outline-0"
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
            <button
              onClick={submit}
              className="d-flex absolute mt-11 cursor-pointer hover:bg-[#638b9d] left-236 text-blue-50 rounded-xl p-1"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-6 stroke-3 w-7 h-8"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
                />
              </svg>
            </button>
            {/* Image with Some Text Before Click on Search */}
            {!hideDiv && (
              <div className="main-div-content">
                <img
                  src="minipng.png"
                  alt="Image Name Error"
                  className="m-auto mt-10 w-80"
                />

                <h1 className="text-[#ffff] text-4xl mb-3 font-bold ">
                  Search City
                </h1>
                <p className="text-[#ffff] text-xl">
                  Find out the weather conditions of the city.
                </p>
              </div>
            )}
            {/* After Click on Search, the main data will show here */}
            {hideDiv && (
              <div className="second-main-div pt-10">
                <div className="top flex space-x-45 pt-5 ps-8 text-[#fcfcfc]">
                  <h1 className="text-xl font-bold">
                    <span className="">🏠 </span> {city}
                  </h1>
                  <p className="text-xl">{date}</p>
                </div>

                <div className="center flex space-x-47 p-2 pt-7 ps-10 text-[#fcfcfc]">
                  <span className="text-7xl pt-6 ps-5">{symbol}</span>
                  <h1 className="pt-8 font-bold text-2xl">
                    {data.current_condition[0].FeelsLikeC}°C
                    <p className="font-normal">
                      {data.current_condition[0].weatherDesc[0].value}
                    </p>
                  </h1>
                </div>

                <div className="center-last text-[#fcfcfc] flex space-x-43 p-2 ps-10 pt-13">
                  <div className="left flex gap-2 items-center">
                    <span className="text-2xl">💧</span>
                    <span className="text-lg">
                      Humidity
                      <span className="block font-bold">
                        {data.current_condition[0].humidity}%
                      </span>
                    </span>
                  </div>
                  <div className="right flex items-center gap-2">
                    <span className="text-2xl">💨</span>
                    <span className="text-lg">
                      Wind Speed
                      <span className="block font-bold">
                        {data.current_condition[0].windspeedKmph} M/s
                      </span>
                    </span>
                  </div>
                </div>

                <div className="fotter text-[#fcfcfc] text-xl pt-6 flex gap-6 items-center justify-center">
                  <div className="card bg-[#346a899e] w-30 h-34 rounded-xl grid place-items-center">
                    <span className="">{todayDate}</span>
                    <span className="text-4xl">{symbol}</span>
                    <span className="font-bold">
                      {data.current_condition[0].FeelsLikeC}°C
                    </span>
                  </div>
                  <div className="card bg-[#346a899e] w-30 h-34 rounded-xl grid place-items-center">
                    <span className="">{tomorrowDate}</span>
                    <span className="text-4xl">🌩</span>
                    <span className="font-bold">
                      {data.weather[1].avgtempC}°C
                    </span>
                  </div>
                  <div className="card bg-[#346a899e] w-30 h-34 rounded-xl grid place-items-center">
                    <span className="">{dayAfterDate}</span>
                    <span className="text-4xl">🌫</span>
                    <span className="font-bold">
                      {data.weather[2].avgtempC}°C
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      {/* End of the Program */}
    </>
  );
}

export default App;
