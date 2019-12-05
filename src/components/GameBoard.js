import React, { Component } from 'react'
import './GameBoard.css'
import axios from 'axios'

class GameBoard extends Component {
    constructor(props) {
        super(props)
        this.state = {
            data: {},
            loading: true,
            error: null,
            stats: []
        }
    }

    componentDidMount = () => {
        axios.get(`https://dev-games-backend.advbet.com/v1/ab-roulette/1/configuration`)
        .then(res => {
            this.setState({
                data: res.data,
                loading: false
            })
        })
        .catch(error => {
            this.setState({
                error,
                loading: false
            })
        })
    }
    
    componentDidUpdate = () => {
        let filteredIdArr = []
        filteredIdArr = this.state.data.positionToId.filter((id, i) => i % 2 !== 0)

        const buttons = document.querySelectorAll("button")

        for (let i = 0; i < buttons.length; i++) {
            for (let j = 0; j < filteredIdArr.length; j++) {

                if (Number(buttons[i].innerHTML) === this.props.randomNumber) {
                    buttons[i].style.background = "#007BFF"

                    if (Number(buttons[i].innerHTML) === filteredIdArr[j]) {
                        setTimeout(() => buttons[i].style.background = "#D9534F", 3000)
                    }

                    else {
                        setTimeout(() => buttons[i].style.background = "#000000", 3000)
                    }
                }

                if (Number(buttons[i].innerHTML) === filteredIdArr[j]) {
                    break
                }
            }
        }
    }

    render() {
        const { data, loading, error } = this.state

        const green = "#449D44"
        const red = "#D9534F"
        const black = "#000000"

        if (loading) return <div>Loading</div>
        if (error) return <div>Error</div>

        if (data.positionToId.length >= 1) {
            return ( 
                <div className="game-board">
                    <h4 className="game-board-h4">Game board</h4>
                    <div>
                        {data.positionToId.map((id, i) => <button key={i} style={i === 0 ? {background: green} : i % 2 !== 0 ? {background: red} : {background: black}}>{id}</button>)}
                    </div>
                </div>
            )
        }
        return <div>No Data</div>
    }
}

export default GameBoard