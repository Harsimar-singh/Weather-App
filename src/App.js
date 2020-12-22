import React from 'react';
import './App.css';
import Form from "./components/form";
import Weather from "./components/weather";
import "bootstrap/dist/css/bootstrap.min.css";

const Api_Key = "429736441cf3572838aa10530929f7cd";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      city: undefined,
      country: undefined,
      icon: undefined,
      main: undefined,
      celsius: undefined,
      farenheit: undefined,
      temp_max: null,
      temp_min: null,
      description: "",
      wind:undefined,
      humidity:undefined,
      error: false
    };

    this.weatherIcon = {
      Thunderstorm: "fas fa-bolt",
      Drizzle: "fas fa-cloud-rain",
      Rain: "fas fa-cloud-showers-heavy",
      Snow: "fas fa-snowflake",
      Atmosphere: "fas fa-smog",
      Clear: "fas fa-sun",
      Clouds: "fas fa-cloud-sun"
    };
  }

  get_WeatherIcon(icons, rangeId) {
    switch (true) {
      case rangeId >= 200 && rangeId < 232:
        this.setState({ icon: icons.Thunderstorm });
        break;
      case rangeId >= 300 && rangeId <= 321:
        this.setState({ icon: icons.Drizzle });
        break;
      case rangeId >= 500 && rangeId <= 521:
        this.setState({ icon: icons.Rain });
        break;
      case rangeId >= 600 && rangeId <= 622:
        this.setState({ icon: icons.Snow });
        break;
      case rangeId >= 701 && rangeId <= 781:
        this.setState({ icon: icons.Atmosphere });
        break;
      case rangeId === 800:
        this.setState({ icon: icons.Clear });
        break;
      case rangeId >= 801 && rangeId <= 804:
        this.setState({ icon: icons.Clouds });
        break;
      default:
        this.setState({ icon: icons.Clouds });
    }
  }

  calCelsius(temp) {
    let cell = Math.floor(temp - 273.15);
    return cell;
  }

  getWeather = async e => {
    e.preventDefault();

    const country = e.target.elements.country.value;
    const city = e.target.elements.city.value;

    if (country && city) {
      const api_call = await fetch(
        `http://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${Api_Key}`
      );

      const response = await api_call.json();

      this.setState({
        city: `${response.name}, ${response.sys.country}`,
        country: response.sys.country,
        main: response.weather[0].main,
        celsius: this.calCelsius(response.main.temp),
        farenheit:response.main.temp,
        temp_max_celsius: this.calCelsius(response.main.temp_max),
        temp_min_celsius: this.calCelsius(response.main.temp_min),
        temp_max_farenheit: response.main.temp_max,
        temp_min_farenheit: response.main.temp_min,
        description: response.weather[0].description,
        wind:response.wind.speed,
        humidity:response.main.humidity,
        error: false
      });

      // seting icons
      this.get_WeatherIcon(this.weatherIcon, response.weather[0].id);

      console.log(response);
    } else {
      this.setState({
        error: true
      });
    }
  };

  render() {
    return (
      <div className="App">
        <Form loadweather={this.getWeather} error={this.state.error} />
        <Weather
          cityname={this.state.city}
          weatherIcon={this.state.icon}
          temp_celsius={this.state.celsius}
          temp_farenheit={this.state.farenheit}
          temp_max_celsius={this.state.temp_max_celsius}
          temp_min_celsius={this.state.temp_min_celsius}
          temp_max_farenheit={this.state.temp_max_farenheit}
          temp_min_farenheit={this.state.temp_min_farenheit}
          description={this.state.description}
          wind={this.state.wind}
          humidity={this.state.humidity}
        />
      </div>
    );
  }
}

export default App;