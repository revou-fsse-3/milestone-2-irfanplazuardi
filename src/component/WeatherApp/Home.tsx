import { useNavigate } from "react-router-dom";
import { API } from "./config";
import { search } from "../assets";
import { useFormik } from "formik";
import * as yup from "yup";
import axios, { AxiosError } from "axios";

const Home = () => {
  const navigate = useNavigate();

  const searchCity = async () => {
    const element = document.getElementsByClassName("cityinput")[0] as HTMLInputElement;
    console.log(element);
    if (element.value === "") {
      return 0;
    }
    navigate(`/weather/${element.value}`);
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
        console.log(response);
      } catch (error) {
        if (error instanceof AxiosError && error.response) {
          setErrors({ city: error.response.data.message });
        } else {
          setStatus("Required field");
        }
      }
    },
  });
  return (
    <>
      <h1 className="weather-location">Weather APP</h1>
      <h3 className="description">Find out the weather of your city</h3>
      <form onSubmit={formik.handleSubmit}>
        <div className="topbar">
          <input type="text" className="cityinput" placeholder="Search City" name="city" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.city} autoFocus />
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
