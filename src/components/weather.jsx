import React from "react";
import "./weather.css";

const Weather = props => {
  return (
    <div className="container text-light">
      <div className="Card">
        {props.cityname ? <h1 className="text-white py-3"><i class="fas fa-map-marker-alt"></i> {props.cityname}</h1> : null }
        <h5 className="py-4">
          <i className={`${props.weatherIcon}`} />
        </h5>
        <h2 className="py-2">
          {props.description.charAt(0).toUpperCase() +
            props.description.slice(1)}
        </h2>
        {props.temp_celsius ? (
          <h1 className="py-2">{props.temp_celsius}&#8451; / {props.temp_farenheit}&#8457;</h1>
        ) : null}

        {maxminTemp(props.temp_min_celsius, props.temp_max_celsius,props.temp_max_farenheit,props.temp_min_farenheit)}
          {props.wind ? <h3 className="px-4"><i class="fas fa-wind"></i> {props.wind} m/s</h3> : null}
          {props.humidity ? <h3 className="px-4"><i class="fas fa-tint"></i> {props.humidity} %</h3> : null}
        
      </div>
    </div>
  );
};

export default Weather;

function maxminTemp(minc, maxc, minf, maxf) {
  if (maxc && minc && maxf && minf) {
    return (
      <h3>
        <span className="px-4"><i class="fas fa-temperature-low"></i> {minc}&#8451; / {minf}&#8457;</span>
        <span className="px-4"><i class="fas fa-temperature-high"></i> {maxc}&#8451; / {maxf}&#8457;</span>
      </h3>
    );
  }
}