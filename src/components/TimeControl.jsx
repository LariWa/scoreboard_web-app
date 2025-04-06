import React from 'react';

import UndoAltSolid from '../../icons/undo-alt-solid.svg';
import TimeControlBtn from './TimeControlBtn';

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
	const shotclockWarningThreshold = 5; // if shotclock is <= than this value it will be red
	return (
		<div className="flex-grow text-center">
			<div className='flex justify-center'>
				<div className="mx-4 flex justify-center flex-col space-y-4">
					<TimeControlBtn btnAction={onMinutePlus} actionInterval={400} state={state} isPlus={true} />
					<TimeControlBtn btnAction={OnMinuteMinus} actionInterval={400} state={state} isPlus={false} />
				</div>
				<div className={`w-80 text-${minutes < 1 ? 'red-500' : 'white'} text-9xl`}>
					{minutes}:{seconds}

				</div>
				<div className="mx-4 flex justify-center flex-col space-y-4">
					<TimeControlBtn btnAction={onSecondPlus} actionInterval={200} state={state} isPlus={true} />
					<TimeControlBtn btnAction={onSecondMinus} actionInterval={200} state={state} isPlus={false} />
				</div>
			</div>
			<div className=" flex items-center justify-center space-x-4">
				<div className={`text-${shotclock > shotclockWarningThreshold ? 'yellow-300' : 'red-500'} text-9xl`}>
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