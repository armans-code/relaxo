import React, { useState } from 'react';

function Breathing() {
    const [breathingStage, setBreathingStage] = useState(50);
    const [breatheWord, setBreatheWord] = useState('Relax :)');

    const boxBreathing = () => {
        setTimeout(() => {
            setBreathingStage(100);
            setBreatheWord('Breathe in (4sec)');
        }, 0);
        setTimeout(() => {
            setBreatheWord('Hold (4 sec)');
        }, 4000);
        setTimeout(() => {
            setBreathingStage(50);
            setBreatheWord('Breathe out (4 sec)');
        }, 8000);
        setTimeout(() => {
            setBreatheWord('Hold (4 sec)');
        }, 12000);
        setTimeout(() => {
            setBreatheWord('Relax :)');
        }, 16000);
    };

    return (
        <div className="flex flex-col items-center justify-center gap-20 min-h-screen bg-gray-100">
            <p>
                Find peace of mind with 4-7-8 breathing - a simple technique of
                inhaling deeply for four seconds, holding for seven, and
                exhaling for eight. This exercise activates the body's
                relaxation response, reducing stress, anxiety, and improving
                focus.
            </p>
            <p>
                Box Breathing has been shown to reduce the physical symptoms of
                stress, such as elevated heart rate and blood pressure, and can
                help calm the mind and body. By regulating your breath and
                focusing on the rhythm of your breath, you can enter a state of
                relaxation and mindfulness.
            </p>
            <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                onClick={boxBreathing}
            >
                Start Box Breathing
            </button>
            <div>
                <div className="w-62 h-62 rounded-full border-8 border-blue-900 scale-150 bg-transparent flex items-center justify-center">
                    <div
                        className={`w-60 h-60 flex flex-col items-center justify-center rounded-full bg-blue-500 transition duration-[4s] scale-${breathingStage}`}
                    >
                        <p className="text-white text-2xl">{breatheWord}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Breathing;
