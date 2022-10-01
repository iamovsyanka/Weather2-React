import React, {Component} from "react";

import weatherService from "../services/weatherService";
import Search from "./search";
import '../static/css/weather.css'
import 'bootstrap/dist/css/bootstrap.min.css';

class Weather extends Component {
    constructor(props) {
        super(props);
        this.state = {
            weather: null,
            errorMessage: ''
        };
    }

    dateBuilder = (d) => {
        let options = {
            weekday: "long", year: "numeric", month: "long",
            day: "numeric", hour: "2-digit", minute: "2-digit"
        };

        return d.toLocaleTimeString("en-us", options);
    }

    tempBuilder = (t) => Math.round(t) + '°c';

    setCity = async (cityName) => {
        let response = await weatherService.getWeatherByCityName(cityName);

        if (response.main) {
            this.setState({weather: response, errorMessage: ''});
        } else {
            this.setState({weather: '', errorMessage: response})
        }
    }

    render() {
        return <div className='app'>
            <main>
                <div className="search-box">
                    <Search setCity={this.setCity}/>
                </div>
                {this.state.weather && (
                    <div>
                        <div className="location-box">
                            <div className="location">{this.state.weather.name}, {this.state.weather.sys.country}</div>
                            <div className="date">{this.dateBuilder(new Date())}</div>
                        </div>
                        <div className="weather-box">
                            <div className="temp">
                                {this.tempBuilder(this.state.weather.main.temp)}
                            </div>
                            <div className="weather">{this.state.weather.weather[0].main}</div>
                        </div>
                        <div className="map"/>
                    </div>
                )}
                {this.state.errorMessage &&
                <div className="alert alert-danger" role="alert">
                    {this.state.errorMessage}
                </div>
                }
            </main>
        </div>
    }
}

export default Weather;