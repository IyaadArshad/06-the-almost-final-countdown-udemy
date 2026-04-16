import { useState, useRef } from "react";
import ResultModal from './ResultModal'

export default function TimerChallenge({ title, targetTime }) {
    const timer = useRef()
    const dialog = useRef()
    const [timeRemaining, setTimeRemaining] = useState(targetTime*1000)
    const [timerStarted, setTimerStarted] = useState(false)
    const [gameResult, setGameResult] = useState(null)
    const [finalRemainingTime, setFinalRemainingTime] = useState(targetTime*1000)
    const timerIsActive = timeRemaining > 0 && timeRemaining < (targetTime*1000)
    const timerExpired = timeRemaining <= 0

    if (timeRemaining<=0) {
        clearInterval(timer.current);
        setGameResult(false)
        setFinalRemainingTime(timeRemaining)
        setTimeRemaining(targetTime*1000)

        dialog.current.open();
    }
    function handleStart() {
        timer.current = setInterval(() => {
            setTimeRemaining(prevTimeRemaining => prevTimeRemaining - 10);
        }, 10)

        setTimerStarted(true);
    }

    function handleReset () {
        setTimeRemaining(targetTime*1000)
    }

    function handleStop() {
        setGameResult(true)
        setFinalRemainingTime(timeRemaining)
        dialog.current.open();
        clearInterval(timer.current)
    }
    return (
        <>
            <ResultModal onReset={handleReset} ref={dialog} targetTime={targetTime} result={gameResult} remainingTime={finalRemainingTime} />
            <section className="challenge">
                <h2>{title}</h2>
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