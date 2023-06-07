import React from 'react'

function WinnerScreen({ username, restartGame, playerWon }) {
    console.log({ playerWon })
    return (
        <div className='winner'>
            <h2 className='congo'>
                {
                    playerWon == "No One"
                        ? 'Oops! Its a draw'
                        : 'Congratulation!'
                }
            </h2>
            <h3 className='player'>{username} Won the Game.</h3>
            <button onClick={restartGame}>
                Restart
            </button>
        </div>
    )
}

export default WinnerScreen