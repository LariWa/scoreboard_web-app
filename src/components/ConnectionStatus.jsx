import React, { useEffect, useState } from 'react';

	
function ConnectionStatus({ connected}) {
	const [online, setOnline] = useState(navigator.onLine);

	useEffect(() => {
		const goOnline = () => setOnline(true);
		const goOffline = () => setOnline(false);
	
		window.addEventListener("online", goOnline);
		window.addEventListener("offline", goOffline);
	
		return () => {
		  window.removeEventListener("online", goOnline);
		  window.removeEventListener("offline", goOffline);
		};
	  }, []);

	return (
		!connected || !online ? (
			<div className="fixed inset-0 bg-black/55 flex items-center justify-center">
				<div className="bg-gray-800 p-8 rounded-lg text-center text-white text-6xl border-4 border-red-600">
					Nicht verbunden!
				</div>
			</div>
		) : null
	);
}

export default ConnectionStatus;