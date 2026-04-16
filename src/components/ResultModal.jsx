import { forwardRef, useImperativeHandle, useRef } from "react"
import { createPortal } from 'react-dom'

const ResultModal = forwardRef(function ResultModal({ result, onReset, targetTime, remainingTime }, ref) {
    const dialog = useRef()

    const userLost = !result
    const score = Math.round((1 - (remainingTime / 1000) / targetTime) * 100)
    const formattedRemainingTime = (remainingTime / 1000).toFixed(2)

    useImperativeHandle(ref, () => ({
        open() {
            dialog.current.showModal()
        }
    }))
    return createPortal(
        <dialog className="result-modal" onClose={onReset} ref={dialog}>
            <h2>You {userLost ? 'lost' : 'won'}</h2>
            <p>The target time was <strong>{targetTime} seconds.</strong></p>
            <p>You stopped the timer with <strong>{formattedRemainingTime} seconds left.</strong></p>
            {userLost ? null : <p>Your score is <strong>{score}</strong></p>}
            <form method="dialog" onSubmit={onReset}>
                <button>Close</button>
            </form>
        </dialog>,
        document.getElementById('modal')
    )
})

export default ResultModal