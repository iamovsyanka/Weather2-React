import React, {Component} from "react";

import "../static/css/search.css"
import 'bootstrap/dist/css/bootstrap.min.css';
import {Button} from "react-bootstrap";

class Search extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cityName: '',
            errorMessage: ''
        };
    }

    search = async () => {
        if (this.state.errorMessage === '') {
            this.props.setCity(this.state.cityName);
        }
    }

    onChangeCity = (e) => {
        const cityName = e.target.value;
        this.setState({cityName: cityName, errorMessage: cityName.match(/\d+/) ? "City is invalid" : ''});
    }

    render() {
        return <form>
            <input
                type="text"
                className="search-bar"
                placeholder="Enter city..."
                onChange={this.onChangeCity}
                value={this.state.cityName}
            />
            <Button onClick={this.search}>Search</Button>
            {this.state.errorMessage &&
            <div className="alert alert-danger" role="alert">
                {this.state.errorMessage}
            </div>
            }
        </form>
    }
}

export default Search;