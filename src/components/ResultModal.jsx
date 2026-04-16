import { forwardRef, useImperativeHandle, useRef } from "react"

const ResultModal = forwardRef(function ResultModal({ result, onReset, targetTime, remainingTime }, ref) {
    const dialog = useRef()

    const userLost = remainingTime <= 0

    const formattedRemainingTime = (remainingTime / 1000).toFixed(2)

    useImperativeHandle(ref, () => ({
        open() {
            dialog.current.showModal()
        }
    }))
    return (
        <dialog className="result-modal" ref={dialog}>
            <h2>You {userLost ? 'won' : 'lost'}</h2>
            <p>The target time was <strong>{targetTime} seconds.</strong></p>
            <p>You stopped the timer with <strong>{formattedRemainingTime} seconds left.</strong></p>
            <form method="dialog" onSubmit={onReset}>
                <button>Close</button>
            </form>
        </dialog>
    )
})

export default ResultModal