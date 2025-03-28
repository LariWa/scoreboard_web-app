import React from 'react';

import UndoAltSolid from '../../icons/undo-alt-solid.svg';
import PlusSolid from '../../icons/plus-solid.svg';
import MinusSolid from '../../icons/minus-solid.svg';
export default function TimeDisplay({
	minutes,
	seconds,
	shotclock,
	onTimePlus,
	onTimeMinus,
	onShotclockReset,
}) {
	return (
		<div className="flex-grow text-center">
			<div className="text-white text-9xl">
				{minutes}:{seconds}
			</div>
			<div className=" flex items-center justify-center">
				<div className="text-green-500 text-9xl flex items-center justify-center">
					{shotclock}
				</div>
				<button
					className="w-16 h-16"
					onClick={onShotclockReset}
				>
					<img src={UndoAltSolid} alt="Reset" className="w-full h-full" />
				</button>
			</div>
			<div className="mt-4 flex justify-center">
				<button
					className="mx-2 w-16 h-16 flex items-center justify-center"
					onClick={onTimePlus}
				>
					<img src={PlusSolid} alt="Increase" className="w-full h-full" />
				</button>
				<button
					className="mx-2 w-16 h-16 flex items-center justify-center"
					onClick={onTimeMinus}
				>
					<img src={MinusSolid} alt="Decrease" className="w-full h-full" />
				</button>
			</div>
		</div>
	);
}