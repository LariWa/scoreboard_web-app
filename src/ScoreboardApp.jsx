import React, { useEffect, useRef, useState } from 'react';

// SVG Imports


import ExchangeAltSolid from '../icons/exchange-alt-solid.svg';
import PlaySolid from '../icons/play-solid.svg';
import PauseSolid from '../icons/pause-solid.svg';
import UndoAltSolid from '../icons/undo-alt-solid.svg';

import CheckSolid from '../icons/check-solid.svg';
import TimesSolid from '../icons/times-solid.svg';
import ScoreControl from './components/ScoreControl';
import TimeDisplay from './components/TimeControl';
import ConnectionStatus from './components/ConnectionStatus';
import ResetModal from './components/ResetModal';
import ReconnectingWebSocket from 'reconnecting-websocket';

function ScoreboardApp() {
    const server = "ws://192.168.4.1:8080";
    const [connected, setConnected] = useState(false);
    const [scoreL, setScoreL] = useState('-');
    const [scoreR, setScoreR] = useState('-');
    const [minutes, setMinutes] = useState('00');
    const [seconds, setSeconds] = useState('00');
    const [shotclock, setShotclock] = useState('--');
    const [isModalOpen, setIsModalOpen] = useState(false);

    const rwsRef = useRef(new ReconnectingWebSocket(server));

    const sendCmd = (command) => {
        if (rwsRef.current && rwsRef.current.readyState === WebSocket.OPEN) {
            rwsRef.current.send(command);
        } else {
            console.error('WebSocket is not connected');
        }
    };

    useEffect(() => {
        rwsRef.current.addEventListener('message', (evt) => {
            try {
                const obj = JSON.parse(evt.data);
                setScoreL(obj.score[0]);
                setScoreR(obj.score[1]);
                setMinutes(obj.time[0]);
                setSeconds(obj.time[1] < 10 ? "0" + obj.time[1] : obj.time[1]);
                setShotclock(obj.shotclock);
            } catch (error) {
                console.error("Error parsing WebSocket message:", error);
            }
        });

        rwsRef.current.addEventListener('close', () => {
            setConnected(false);
        });

        rwsRef.current.addEventListener('open', () => {
            setConnected(true);
        });

        return () => {
            if (rwsRef.current) {
                rwsRef.current.close();
            }
        };
    }, [server]);

    return (
        <div className="min-h-screen bg-black text-red-500 flex flex-col items-center justify-center p-4">
            <div id="anzeige" className="flex w-full items-center flex-wrap">
                <ScoreControl
                    score={scoreL}
                    onPlus={() => sendCmd('scoreLeftPlus')}
                    onMinus={() => sendCmd('scoreLeftMinus')}
                />

                <TimeDisplay
                    minutes={minutes}
                    seconds={seconds}
                    shotclock={shotclock}
                    onTimePlus={() => sendCmd('timePlus')}
                    onTimeMinus={() => sendCmd('timeMinus')}
                    onShotclockReset={() => sendCmd('shotclockReset')}
                />

                <ScoreControl
                    score={scoreR}
                    onPlus={() => sendCmd('scoreRightPlus')}
                    onMinus={() => sendCmd('scoreRightMinus')}
                />
            </div>

            <div className="text-center mt-8">
                <button
                    className="bg-transparent border-2 border-white text-white rounded-lg p-4 flex items-center justify-center"
                    onClick={() => sendCmd('playPause')}
                >
                    <img src={PlaySolid} alt="Play" className="w-12 h-12 mr-2" />
                    <img src={PauseSolid} alt="Pause" className="w-12 h-12" />
                </button>
            </div>

            <div className="flex justify-center mt-8">
                <button
                    className="mx-4 bg-gray-700 rounded-lg p-4"
                    onClick={() => setIsModalOpen(true)}
                >
                    <img src={UndoAltSolid} alt="Reset" className="w-8 h-8" />
                </button>
                <button
                    className="mx-4 bg-gray-700 rounded-lg p-4"
                    onClick={() => sendCmd('switch')}
                >
                    <img src={ExchangeAltSolid} alt="Switch" className="w-8 h-8" />
                </button>
            </div>

            <ConnectionStatus connected={connected} />

            <ResetModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onConfirm={() => {
                    sendCmd('reset');
                    setIsModalOpen(false);
                }}
                checkIcon={CheckSolid}
                timesIcon={TimesSolid}
            />
        </div>
    );
}

export default ScoreboardApp;