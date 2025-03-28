import React from 'react';

function ConnectionStatus({ connected }) {
	return (
		<div
			className={`fixed top-4 right-4 text-4xl ${connected ? 'hidden' : 'block text-red-500'
				}`}
		>
			not connected
		</div>
	);
}

export default ConnectionStatus;