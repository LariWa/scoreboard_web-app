import React, { useEffect, useRef, useState } from 'react';

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
    const server = "ws://scoreboard.local:8080";
    const [connected, setConnected] = useState(false);
    const [scoreL, setScoreL] = useState('-');
    const [scoreR, setScoreR] = useState('-');
    const [colorL, setColorL] = useState('rgb(255, 0, 0)');
    const [colorR, setColorR] = useState('rgb(255, 0, 0)');
    const [minutes, setMinutes] = useState('00');
    const [seconds, setSeconds] = useState('00');
    const [shotclock, setShotclock] = useState('--');
    const [state, setState] = useState("idle");
    const [isModalOpen, setIsModalOpen] = useState(false);

    const rwsRef = useRef(null);
    const checkWebsocketIntervall = useRef(null);
    const params = new URLSearchParams(window.location.search);
    const mirror = params.get("mirror") === "true";
    const sendCmd = (command) => {
        if (rwsRef.current && rwsRef.current.readyState === WebSocket.OPEN) {
            rwsRef.current.send(command);
        } else {
            console.error('WebSocket is not connected');
        }
    };

    const sendScore = (isLeft, increase) => {
        const side = (isLeft ^ mirror) ? "Left" : "Right";
        sendCmd("score" + side + (increase ? "Plus" : "Minus"))
    }

    const resetConnectionCheck = () => {
        clearInterval(checkWebsocketIntervall.current);
        checkWebsocketIntervall.current = setInterval(() => {
            setConnected(false);
        }, 2000);
    };

    useEffect(() => {
        rwsRef.current = new ReconnectingWebSocket(server);

        rwsRef.current.addEventListener('message', (evt) => {
            resetConnectionCheck();
            setConnected(true)
            try {
                const obj = JSON.parse(evt.data);
                setScoreL(obj.score[mirror ? 1 : 0]);
                setScoreR(obj.score[mirror ? 0 : 1]);
                setMinutes(obj.time[0]);
                setSeconds(obj.time[1] < 10 ? "0" + obj.time[1] : obj.time[1]);
                setShotclock(obj.shotclock);
                setColorL(obj.color[mirror ? 1 : 0])
                setColorR(obj.color[mirror ? 0 : 1])
                setState(obj.state)
            } catch (error) {
                console.error("Error parsing WebSocket message:", error);
            }
        });

        rwsRef.current.addEventListener('close', () => {
            setConnected(false);
            clearInterval(checkWebsocketIntervall.current);
        });

        rwsRef.current.addEventListener('open', () => {
            setConnected(true);
            resetConnectionCheck();
        });

        return () => {
            if (rwsRef.current) {
                rwsRef.current.close();
            }
        };
    }, [server]);

    useEffect(() => {
        const handleContextMenu = (e) => {
            e.preventDefault();
        };
        document.addEventListener('contextmenu', handleContextMenu);

        return () => {
            document.removeEventListener('contextmenu', handleContextMenu);
        };
    }, []);

    useEffect(() => {
        const handleKeyPress = (event) => {
            if (event.code === "Space") {
                event.preventDefault();
                sendCmd('shotclockReset')
            }
        };

        window.addEventListener("keydown", handleKeyPress);
        return () => window.removeEventListener("keydown", handleKeyPress);
    }, []);

    return (
        <div className="min-h-screen bg-black flex flex-col items-center justify-center p-4">
            <div id="anzeige" className="flex w-full items-center flex-wrap ">
                <ScoreControl
                    score={scoreL}
                    sendScore={sendScore}
                    isLeft={true}
                    color={colorL}
                />

                <TimeDisplay
                    minutes={minutes}
                    seconds={seconds}
                    shotclock={shotclock}
                    onMinutePlus={() => sendCmd('timeMinutePlus')}
                    OnMinuteMinus={() => sendCmd('timeMinuteMinus')}
                    onSecondPlus={() => sendCmd('timeSecondPlus')}
                    onSecondMinus={() => sendCmd('timeSecondMinus')}
                    onShotclockReset={() => sendCmd('shotclockReset')}
                    state={state}
                />

                <ScoreControl
                    score={scoreR}
                    sendScore={sendScore}
                    isLeft={false}
                    color={colorR}
                />
            </div>

            <div className="text-center mt-8">
                <button
                    className="w-24 h-24"
                    onClick={() => sendCmd('playPause')}
                >
                    {state !== "running" ? (
                        <img src={PlaySolid} alt="Play" />
                    ) : (
                        <img src={PauseSolid} alt="Pause" />
                    )}
                </button>
            </div>

            <div className="flex justify-center absolute bottom-0 left-0 space-x-4 m-4">
                <button
                    onClick={() => setIsModalOpen(true)}
                    disabled={state == "running"}
                >
                    <img src={UndoAltSolid} alt="Reset" />
                </button>
                <button
                    onClick={() => sendCmd('switch')}
                    disabled={!(state == "idle" || (state == "paused" && Number(minutes) == 0 && Number(seconds) == 0))}
                >
                    <img src={ExchangeAltSolid} alt="Switch" />
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