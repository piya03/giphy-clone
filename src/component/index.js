
import React, { Component } from "react";
import './common.css';

class Giphy extends Component {
    constructor(props) {
        super(props);
        this.state = {
            giphyList: {},
            inputvalue: ""
        }
    }
    componentDidMount() {
        fetch("https://api.giphy.com/v1/gifs/trending?api_key=G7OcKtjFvrc8jpXSUn9UyB0X6ngzXfw0&limit=10").then((
            res) => {
            return res.json()
        }).then((result) => {
            console.log("result", result)
            this.setState({
                giphyList: result
            })
        })
        document.addEventListener("keydown", this.handleKeyPress);
    }

    componentWillUnmount() {
        document.removeEventListener("keydown", this.handleKeyPress);

      }


    handleChange = (e) => {
        this.setState({
            inputvalue: e.target.value
        })
    }
    searchGif = (e) => {
        if (this.state.inputvalue) {
            this.fetchGif(this.state.inputvalue)

        }
        this.setState({
            inputvalue: ""
        })

    }

    fetchGif = (searchText) => {
        fetch(`https://api.giphy.com/v1/gifs/search?q=${searchText}&api_key=G7OcKtjFvrc8jpXSUn9UyB0X6ngzXfw0&limit=10`).then((
            res) => {
            return res.json()
        }).then((result) => {
            console.log("result", result)
            this.setState({
                giphyList: result
            })
        })
    }
    // for enter press
    handleKeyPress = (event) => {
        if (event.keyCode === 13) {
            this.fetchGif(this.state.inputvalue)
            this.setState({
                inputvalue: ""
            })
        }

    }


    onClickTabs = (value) => {
        this.fetchGif(value)
    }
    // reactionClick = (e) => {
    //     this.fetchGif(e.target.innerText)
    // }
    // entertainmentClick = (e) => {
    //     this.fetchGif(e.target.innerText)
    // }
    // sportsClick = (e) => {
    //     this.fetchGif(e.target.innerText)
    // }
    // stickersClick = (e) => {
    //     this.fetchGif(e.target.innerText)
    // }
    // artistsClick = (e) => {
    //     console.log(e.target.innerText, "Aaaaaaaaaaaaaaa")
    //     this.fetchGif(e.target.innerText)
    // }
    render() {
        const { giphyList, inputvalue } = this.state
        return (
            <div className="container">
                <div className="header">
                    <div className='logo'>
                        <i className="fa fa-xing-square"></i>
                        <span> GIPHY</span>
                    </div>
                    <div className='menu'>
                        <ul className='myul'>
                            <li onClick={() => {this.onClickTabs("Reactions")}}>Reactions</li>
                            <li onClick={() => {this.onClickTabs("Entertainment")}}>Entertainment</li>
                            <li onClick={() => {this.onClickTabs("Sports")}}>Sports</li>
                            <li onClick={() => {this.onClickTabs("Stickers")}}>Stickers</li>
                            <li onClick={() => {this.onClickTabs("Artists")}}>Artists</li>
                        </ul>
                    </div>
                    <div className='login'>
                        <i className="fa fa-user"></i>
                        <span>Log In</span>
                    </div>
                </div>



                <div className="search-box">
                    <input type="text" placeholder="search..." value={inputvalue} onChange={this.handleChange} />
                    <button onClick={this.searchGif}><i class="fa fa-search"></i></button>
                </div>

                <div className="img-container">
                    {giphyList.data && giphyList.data.map((each) => {
                        return (<div><img src={each.images.original.url} /></div>
                        )
                    })}
                </div>
            </div>
        )
    }

}



export default Giphy;

/**
 * 1. onclick of categories the respective category item should come up // done
 * 2. onclick of giphy header title, the [age should reload
 * 3. On enter when input is in focus shoudl also trigger search // done
 * 4. when ever search is active show some loader in the page
 * 5. There should be a previous and next button in at the bottom of the page.
 * on click of next the next page results should be shown and and for previous previous page.
 * 6. The site should be responsive. //done
 *
 */