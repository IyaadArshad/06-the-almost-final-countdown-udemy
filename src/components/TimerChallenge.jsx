import { useState, useRef } from "react";
import ResultModal from './ResultModal'

export default function TimerChallenge({ title, targetTime }) {
    const timer = useRef()
    const dialog = useRef()
    const [timeRemaining, setTimeRemaining] = useState(targetTime*1000)
    const [timerStarted, setTimerStarted] = useState(false)
    const timerIsActive = timeRemaining > 0 && timeRemaining < (targetTime*1000)
    const timerExpired = timeRemaining <= 0

    if (timeRemaining<=0) {
        clearInterval(timer.current);
        setTimeRemaining(targetTime*1000)

        dialog.current.open();
    }
    function handleStart() {
        timer.current = setInterval(() => {
            setTimeRemaining(prevTimeRemaining => prevTimeRemaining - 10);
        }, 10)

        setTimerStarted(true);
    }

    function handleStop() {
        dialog.current.open();
        clearInterval(timer.current)
    }
    return (
        <>
            <ResultModal ref={dialog} targetTime={targetTime} result={!timerExpired} />
            <section className="challenge">
                <h2>{title}</h2>
                {timerExpired && 'ya lost'}
                <p className="challenge-time">{targetTime} second{targetTime > 1 ? 's' : ''}</p>
                <p>
                    <button onClick={timerStarted ? handleStop : handleStart}>
                        {timerIsActive ? 'Stop' : 'Start'} Challenge
                    </button>
                </p>
                <p className={timerStarted ? 'active' : null}>
                    {timerIsActive ? 'Time is running out!' : 'nothing to see here'}
                </p>
            </section>
        </>
    );
}