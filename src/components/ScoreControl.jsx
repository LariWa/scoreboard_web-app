import React from 'react';
import CaretUpSolid from '../../icons/caret-up-solid.svg';
import CaretDownSolid from '../../icons/caret-down-solid.svg';

function ScoreControl({ score, sendScore, isLeft, color }) {
	return (
		<div className="flex-grow flex flex-col items-center space-y-4">
			<button
				className='w-24 h-24'
				onClick={()=> sendScore(isLeft, true)}
			>
				<img src={CaretUpSolid} alt="Increase" />
			</button>
			<div className="text-9xl" style={{ color: color }}>{score} </div>
			<button
				className='w-24 h-24'
				onClick={()=> sendScore(isLeft, false)}
			>
				<img src={CaretDownSolid} alt="Decrease" />
			</button>
		</div>
	);
}
export default ScoreControl;