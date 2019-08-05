import React, { Component } from 'react';
//import { NavLink } from 'react-router-dom'
import $ from 'jquery';
import axios from 'axios';
import Search from './Search'
import AnimeList from './AnimeList.js'
import background from '../img/background.mp4'
import logo from '../img/logo.png'


class Dashboard extends Component {
    state = {
        title: null,
        image_url: null,
        type: null,
        score: null,
        status: null,
        episodes: null,
        aired: null,
        genre: null,
        rating: null,
        sypnosis: null,
        output: null
    }

    handleSubmit = (e) => {
        e.preventDefault();
        let searchText = $('#searchText').val();
        this.setState({
            ...this.state,
            title: searchText
        }, () => {
            this.getAnimes(this.state.title);
        })
    }

    animeSelected = (id) => {
        console.log("HERE")
        this.props.history.push('/anime/' + id);
    }

    getAnimes = (searchName) => {
        axios.get('https://api.jikan.moe/v3/search/anime?q=' + searchName + '&page=1')
            .then((response) => {
                let animes = response.data.results;
                this.setState({
                    ...this.state,
                    output: animes
                })
            })
            .catch((error) => {
                console.log(error)
            })
    }

    componentDidMount() {
        console.log("Dashboard")
    }

    render() {
        return (
            <div id="my-dashboard">
                <div className="container dashboard-page">
                    <div className="search-box">
                        <div className="row dashboard-items">
                            <img className="dashboard-logo" src={logo} alt="website-logo" />
                            <Search handleSubmit={this.handleSubmit} />
                        </div>
                    </div>
                    <div className="anime-list">
                        <AnimeList output={this.state.output} />
                    </div>
                </div>
                <div id="video-container">
                    <video id="dashboard-background" autoPlay loop muted playsInline controls={true}>
                        <source src={background} type="video/mp4" />
                    </video>
                </div>
            </div>
        )
    }
}
export default Dashboard