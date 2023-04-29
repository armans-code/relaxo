import React, { useEffect, useState } from 'react';
import BoxBreathing from '../components/breathing/BoxBreathing';
import FourSevenEightBreathing from '../components/breathing/FourSevenEightBreathing';
import FiveSevenBreathing from '../components/breathing/FiveSevenBreathing';
import axios from 'axios';

function Breathing() {
    const [prompt, setPrompt] = useState('');
    const [method, setMethod] = useState('');

    const handleSubmit = async () => {
        axios.post('/breathing', { prompt }).then((data) => {
            setMethod(data?.data?.choices[0]?.message?.content);
            console.log(method);
        });
    };

    return (
        <div className="w-7/12 mx-auto flex flex-col items-center gap-20">
            <div class="w-full mt-4">
                <textarea
                    class="w-full h-32 px-3 py-1 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg focus:outline-none"
                    placeholder="I am feeling..."
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                />
                <button
                    onClick={handleSubmit}
                    className="w-full flex justify-center bg-blue-600 hover:bg-blue-800 text-gray-100 p-3 rounded-full tracking-wide font-semibold shadow-lg cursor-pointer transition ease-in duration-200"
                >
                    Find Breathing Technique
                </button>
            </div>

            {method && <p>Recommended Breathing Technique: {method} Method</p>}

            {method == '5-7' && <FiveSevenBreathing />}
            {method == '4-7-8' && <FourSevenEightBreathing />}
            {method.toLowerCase() == 'box' && <BoxBreathing />}
        </div>
    );
}

export default Breathing;
