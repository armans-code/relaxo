import React, { useState } from 'react';

function FourSevenEightBreathing() {
    const [breathingStage, setBreathingStage] = useState(50);
    const [breatheDuration, setBreatheDuration] = useState(50);
    const [breatheWord, setBreatheWord] = useState('Relax :)');

    const boxBreathing = () => {
        setTimeout(() => {
            setBreathingStage(100);
            setBreatheDuration(4);
            setBreatheWord('Breathe in (4sec)');
        }, 0);
        setTimeout(() => {
            setBreatheWord('Hold (7 sec)');
        }, 4000);
        setTimeout(() => {
            setBreathingStage(50);
            setBreatheDuration(8);
            setBreatheWord('Breathe out (8 sec)');
        }, 11000);
        setTimeout(() => {
            setBreatheWord('Relax :)');
        }, 19000);
    };

    return (
        <div className="flex flex-col items-center justify-center">
            <p>
                Find peace of mind with 4-7-8 breathing - a simple technique of
                inhaling deeply for four seconds, holding for seven, and
                exhaling for eight. This exercise activates the body's
                relaxation response, reducing stress, anxiety, and improving
                focus.
            </p>
            <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded my-20"
                onClick={boxBreathing}
            >
                Start 4-7-8 Breathing
            </button>
            <div>
                <div className="w-62 h-62 rounded-full border-8 border-blue-900 scale-150 bg-transparent flex items-center justify-center">
                    <div
                        className={`w-60 h-60 flex flex-col items-center justify-center rounded-full bg-blue-500 transition ${
                            breatheDuration == 4
                                ? 'duration-[4s]'
                                : 'duration-[8s]'
                        } ${breathingStage == 50 ? 'scale-50' : 'scale-100'}`}
                    >
                        <p className="text-white text-2xl">{breatheWord}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default FourSevenEightBreathing;
