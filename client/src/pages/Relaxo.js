import React, { useEffect, useRef } from 'react';
import { useState } from 'react';
import axios from 'axios';

function Relaxo() {
    const [prompt, setPrompt] = useState('');
    const [response, setResponse] = useState('');
    const [log, setLog] = useState([]);
    const messageContainerRef = useRef(null);

    const handleSubmit = async () => {
        axios
            .post('/relaxo', { prompt, log })
            .then((data) => {
                const chatResponse = data?.data?.choices[0]?.message?.content;
                setLog([
                    ...log,
                    { role: 'user', content: prompt },
                    { role: 'assistant', content: chatResponse },
                ]);
                setResponse(chatResponse);
            })
            .then(setPrompt(''))
            .catch((err) => console.error(err));
    };

    useEffect(() => {
        messageContainerRef.current.scrollTop =
            messageContainerRef.current.scrollHeight;
    }, [log]);

    console.log(log);

    return (
        <div className="w-7/12 mx-auto flex flex-col items-center overflow-hidden h-screen">
            <div
                className="flex flex-col gap-6 overflow-auto w-full h-full"
                ref={messageContainerRef}
            >
                {log?.map((msg) => (
                    <p className="border px-4 py-4">
                        <b>{msg.role == 'user' ? 'You' : 'Relaxo'}</b> -{' '}
                        {msg.content}
                    </p>
                ))}
            </div>
            <div className="flex gap-3 items-center justify-between w-full bottom-0 h-screen">
                <div class="w-full mt-4">
                    <p className="font-semibold">Entry Content</p>
                    <textarea
                        class="w-full h-32 px-5 py-2.5 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg focus:outline-none"
                        placeholder="Enter your message..."
                        value={prompt}
                        onChange={(e) => setPrompt(e.target.value)}
                    />
                </div>
                <button className="border px-3 py-2" onClick={handleSubmit}>
                    Submit
                </button>
            </div>
        </div>
    );
}

export default Relaxo;
