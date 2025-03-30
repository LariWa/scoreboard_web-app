import React from 'react';
import CaretUpSolid from '../../icons/caret-up-solid.svg';
import CaretDownSolid from '../../icons/caret-down-solid.svg';

function ScoreControl({ score, onPlus, onMinus }) {
	return (
		<div className="flex-grow flex flex-col items-center space-y-4">
			<button
				className='w-24 h-24'
				onClick={onPlus}
			>
				<img src={CaretUpSolid} alt="Increase" />
			</button>
			<div className="text-yellow-500 text-9xl">{score}</div>
			<button
				className='w-24 h-24'
				onClick={onMinus}
			>
				<img src={CaretDownSolid} alt="Decrease" />
			</button>
		</div>
	);
}
export default ScoreControl;