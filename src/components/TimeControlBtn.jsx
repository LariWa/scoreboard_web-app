import React, { useRef } from 'react';
import PlusSolid from '../../icons/plus-solid.svg';
import MinusSolid from '../../icons/minus-solid.svg';

export default function TimeControlBtn({ btnAction, actionInterval, isPlus, state }) {
	const intervalRef = useRef(null);

	const startRepeatedCall = () => {
		clearInterval(intervalRef.current);
		btnAction();
		intervalRef.current = setInterval(btnAction, actionInterval);
	};

	const stopRepeatedCall = () => {
		clearInterval(intervalRef.current);
	};

	return (
		<button
			disabled={state == "running"}
			// onMouseDown={startRepeatedCall}
			// onMouseUp={stopRepeatedCall}
			// onMouseLeave={stopRepeatedCall}
			// onTouchStart={startRepeatedCall}
			// onTouchEnd={stopRepeatedCall}
			// onTouchCancel={stopRepeatedCall}
			onClick={btnAction}
		>
			<img src={isPlus ? PlusSolid : MinusSolid} alt="Increase" />
		</button>
	)
}