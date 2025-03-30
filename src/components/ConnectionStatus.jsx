import React from 'react';

function ConnectionStatus({ connected }) {
	return (
		!connected ? (
			<div className="fixed inset-0 bg-black/55 flex items-center justify-center">
				<div className="bg-gray-800 p-8 rounded-lg text-center text-white text-6xl border-4 border-red-600">
					Nicht verbunden!
				</div>
			</div>
		) : null
	);
}

export default ConnectionStatus;