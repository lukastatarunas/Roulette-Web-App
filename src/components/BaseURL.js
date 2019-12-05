import React from 'react'
import './BaseURL.css'

const BaseURL = () => {
    return (
        <div className="base-url">
            <h1>Aardvark Roulette game API demo</h1>
            <form>
                <div className="form-group">
                    <label className="form-label">API base URL</label>
                    <input className="form-input" defaultValue="https://dev-games-backend.advbet.com/v1/ab-roulette/1/" />
                </div>
            </form>
        </div>
    )
}

export default BaseURL