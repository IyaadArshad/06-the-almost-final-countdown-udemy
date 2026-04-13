import { useState } from "react";

export default function TimerChallenge({ title, targetTime }) {
    const [timerStarted, setTimerStarted] = useState(false)
    const [timerExpired, setTimerExpired] = useState(false);

    function handleStart() {

        setTimerStarted(true);

        setTimeout(() => {
            setTimerExpired(true);
        }, targetTime * 1000)

        setTimerStarted(false);
    }
    return (
        <section className="challenge">
            <h2>{title}</h2>
            {timerExpired && 'ya lost'}
            <p className="challenge-time">{targetTime} second{targetTime > 1 ? 's' : ''}</p>
            <p>
                <button onClick={handleStart}>
                    {timerStarted ? 'Stop' : 'Start'} Challenge
                </button>
            </p>
            <p className={timerStarted ? 'active' : null}>
                {timerStarted ? 'Time is running out!' : 'nothing to see here'}
            </p>
        </section>
    );
}