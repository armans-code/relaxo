import React, { useState } from 'react';

function FiveSevenBreathing() {
    const [breathingStage, setBreathingStage] = useState(50);
    const [breatheDuration, setBreatheDuration] = useState(50);
    const [breatheWord, setBreatheWord] = useState('Relax :)');

    const boxBreathing = () => {
        setTimeout(() => {
            setBreathingStage(100);
            setBreatheDuration(5);
            setBreatheWord('Breathe in (5sec)');
        }, 0);
        setTimeout(() => {
            setBreatheWord('Breathe out (7 sec)');
            setBreathingStage(50);
            setBreatheDuration(7);
        }, 5000);
        setTimeout(() => {
            setBreatheWord('Relax :)');
        }, 12000);
    };

    return (
        <div className="flex flex-col items-center justify-center">
            <p>
                This technique involves inhaling for a count of five and
                exhaling for a count of seven. This technique can be used to
                reduce stress, lower blood pressure, and promote relaxation.
            </p>
            <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded my-20"
                onClick={boxBreathing}
            >
                Start 5-7 Breathing
            </button>
            <div>
                <div className="w-62 h-62 rounded-full border-8 border-blue-900 scale-150 bg-transparent flex items-center justify-center">
                    <div
                        className={`w-60 h-60 flex flex-col items-center justify-center rounded-full bg-blue-500 transition ${
                            breatheDuration == 5
                                ? 'duration-[5s]'
                                : 'duration-[7s]'
                        } ${breathingStage == 50 ? 'scale-50' : 'scale-100'}`}
                    >
                        <p className="text-white text-2xl">{breatheWord}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default FiveSevenBreathing;
