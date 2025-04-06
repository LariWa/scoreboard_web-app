import React from 'react';

import UndoAltSolid from '../../icons/undo-alt-solid.svg';
import PlusSolid from '../../icons/plus-solid.svg';
import MinusSolid from '../../icons/minus-solid.svg';
export default function TimeDisplay({
	minutes,
	seconds,
	shotclock,
	onMinutePlus,
	OnMinuteMinus,
	onSecondPlus,
	onSecondMinus,
	onShotclockReset,
	state,
}) {
	return (
		<div className="flex-grow text-center">
			<div className='flex justify-center'>
				<div className="mx-4 flex justify-center flex-col space-y-4">
					<button
						disabled={state == "running"}
						onClick={onMinutePlus}
					>
						<img src={PlusSolid} alt="Increase" />
					</button>
					<button
						disabled={state == "running"}
						onClick={OnMinuteMinus}
					>
						<img src={MinusSolid} alt="Decrease" />
					</button>
				</div>
				<div className={`w-80 text-${minutes < 1 ? 'red-500' : 'white'} text-9xl`}>
					{minutes}:{seconds}

				</div>
				<div className="mx-4 flex justify-center flex-col space-y-4">
					<button
						disabled={state == "running"}
						onClick={onSecondPlus}
					>
						<img src={PlusSolid} alt="Increase" />
					</button>
					<button
						disabled={state == "running"}
						onClick={onSecondMinus}
					>
						<img src={MinusSolid} alt="Decrease" />
					</button>
				</div>
			</div>
			<div className=" flex items-center justify-center space-x-4">
				<div className={`text-${shotclock > 10 ? 'yellow' : 'red'}-500 text-9xl`}>
					{shotclock}
				</div>
				<button
				className='w-24 h-24'
					onClick={onShotclockReset}
				>
					<img src={UndoAltSolid} alt="Reset" />
				</button>
			</div>

		</div>
	);
}