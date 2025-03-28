import React from 'react';
import CaretUpSolid from '../../icons/caret-up-solid.svg';
import CaretDownSolid from '../../icons/caret-down-solid.svg';

function ScoreControl({ score, onPlus, onMinus }) {
	return (
		<div className="flex-grow flex flex-col items-center">
			<button
				className="text-4xl w-16 h-16 mb-4 flex items-center justify-center"
				onClick={onPlus}
			>
				<img src={CaretUpSolid} alt="Increase" className="w-full h-full" />
			</button>
			<div className="text-yellow-500 text-9xl">{score}</div>
			<button
				className="text-4xl w-16 h-16 mt-4 flex items-center justify-center"
				onClick={onMinus}
			>
				<img src={CaretDownSolid} alt="Decrease" className="w-full h-full" />
			</button>
		</div>
	);
}
export default ScoreControl;