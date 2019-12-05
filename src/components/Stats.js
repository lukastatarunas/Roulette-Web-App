import React, { Component } from 'react'
import './Stats.css'
import axios from 'axios'

class Stats extends Component {
    constructor() {
        super()
        this.state = {
            data: [],
            loading: true,
            error: null
        }
    }

    componentDidMount = () => {
        this.fetchData()
    }

    componentDidUpdate = () => {
        this.fetchData()
    }

    fetchData = () => {
        axios.get(`https://dev-games-backend.advbet.com/v1/ab-roulette/1/stats`)
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

    render() {
        const { data, loading, error } = this.state

        if (loading) return <div>Loading</div>
        if (error) return <div>Error</div>

        if (data.length >= 1) {
            return ( 
                <div className="stats">
                    <h4 className="stats-h4">Stats (last 200)</h4>
                    <table className="stats-table">
                        <tbody>
                            <tr>
                                <td>&nbsp;</td>
                                <th colSpan="5" className="cold">Cold</th>
                                <th colSpan="27" className="neutral">Neutral</th>
                                <th colSpan="5" className="hot">Hot</th>
                            </tr>
                            <tr>
                                <th>Slot</th>
                                {data.map((item, i) => <td key={i}>{item.result}</td>)}
                            </tr>
                            <tr>
                                <th>Hits</th>
                                {data.map((item, i) => <td key={i}>{item.count}</td>)}
                            </tr>
                        </tbody>
                    </table>
                </div>
            )
        }
        return <div>No Data</div>
    }
}

export default Stats