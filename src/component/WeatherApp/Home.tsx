import { useNavigate } from "react-router-dom";
import { API } from "./config";
import { clear, cloud, drizzle, humidity, rain, search, snow, wind } from "../assets";
import { useFormik } from "formik";
import * as yup from "yup";
import axios, { AxiosError } from "axios";

const Home = () => {
  const navigate = useNavigate();

  // const [wicon, setWicon] = useState(cloud);
  const searchCity = async () => {
    const element = document.getElementsByClassName("cityinput")[0] as HTMLInputElement;
    console.log(element);
    if (element.value === "") {
      return 0;
    }
    navigate(`/weather/${element.value}`);
    // const url = `https://api.openweathermap.org/data/2.5/weather?q=${element.value}&units=Metric&appid=${API}`;
    // let response = await fetch(url);
    // let data = await response.json();

    // const humidity = document.getElementsByClassName("humidity-percent")[0] as HTMLSpanElement;
    // const wind = document.getElementsByClassName("wind-rate")[0] as HTMLSpanElement;
    // const temperature = document.getElementsByClassName("weather-temp")[0] as HTMLSpanElement;
    // const location = document.getElementsByClassName("weather-location")[0] as HTMLSpanElement;

    // humidity.innerHTML = Math.floor(data.main.humidity) + "%";
    // wind.innerHTML = Math.floor(data.wind.speed) + " km/h";
    // temperature.innerHTML = Math.floor(data.main.temp) + "&#176;C";
    // location.innerHTML = data.name;

    // if (data.weather[0].icon === "01d" || data.weather[0].icon === "01n") {
    //   setWicon(clear);
    // } else if (data.weather[0].icon === "02d" || data.weather[0].icon === "02n") {
    //   setWicon(cloud);
    // } else if (data.weather[0].icon === "03d" || data.weather[0].icon === "03n") {
    //   setWicon(drizzle);
    // } else if (data.weather[0].icon === "04d" || data.weather[0].icon === "04n") {
    //   setWicon(cloud);
    // } else if (data.weather[0].icon === "09d" || data.weather[0].icon === "09n") {
    //   setWicon(rain);
    // } else if (data.weather[0].icon === "10d" || data.weather[0].icon === "10n") {
    //   setWicon(rain);
    // } else if (data.weather[0].icon === "11d" || data.weather[0].icon === "11n") {
    //   setWicon(snow);
    // } else if (data.weather[0].icon === "13d" || data.weather[0].icon === "13n") {
    //   setWicon(snow);
    // } else if (data.weather[0].icon === "50d" || data.weather[0].icon === "50n") {
    //   setWicon(cloud);
    // }
  };

  const validationSchema = yup.object().shape({
    city: yup.string().required("City is required"),
  });

  const formik = useFormik({
    initialValues: {
      city: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values, { setStatus, setErrors }) => {
      try {
        const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${values.city}&units=Metric&appid=${API}`);
        searchCity();
      } catch (error) {
        if (error instanceof AxiosError && error.response) {
          setErrors({ city: error.response.data.message });
        } else {
          setStatus("Required field");
        }
      }
    },
  });
  console.log(formik.errors.city);
  return (
    <>
      <h1 className="weather-location">Weather APP</h1>
      <h3 className="description">Find out the weather of your city</h3>
      <form onSubmit={formik.handleSubmit}>
        <div className="topbar">
          <input type="text" className="cityinput" placeholder="Search City" name="city" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.city} />
          <button className="search-icon" type="submit">
            <img src={search} alt="search" />
          </button>
        </div>
        {formik.errors.city ? <p className="text-error">{formik.errors.city}</p> : null}
      </form>
    </>
  );
};

export default Home;
