import React, { Component } from 'react'
import './Events.css'
import axios from 'axios'
import GameBoard from './GameBoard'

let stringArr = []

class Events extends Component {
    constructor() {
        super()
        this.state = {
            data: {}
        }
    }

    componentDidMount = () => {
        setInterval(() => { 
            axios.get(`https://dev-games-backend.advbet.com/v1/ab-roulette/1/nextGame`)
            .then(res => {
                this.setState({
                    data: res.data
                })
            })
        }, 1000)
    }

    getRandomNumber = () => {
        return Math.floor(Math.random() * (36 - 0 + 1)) + 0
    }

    render() {
        
        let randomNumber = this.state.data.startDelta === 1 ? this.getRandomNumber() : null
        let string = `Game ${this.state.data.id} ended, result is ${Number(randomNumber)}`

        if (randomNumber) {
            stringArr.push(string)
        }

        return (
            <div className="events">
                <GameBoard randomNumber={randomNumber} />
                <h4 className="events-h4">Events</h4>
                <ul>
                    {stringArr.map((str, i) => 
                        <li key={i}>
                            {str}
                        </li>
                    )}
                    <li>
                        {`Game ${this.state.data.id} will start in ${isNaN(this.state.data.startDelta - 1) ? `` : this.state.data.startDelta - 1} sec`}
                    </li>
                </ul>
            </div>
        )
    }
}

export default Events