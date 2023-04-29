import axios from 'axios';
import React, { useState } from 'react';

function Journal() {
    const [prompt, setPrompt] = useState('');
    const [response, setResponse] = useState('');
    const [log, setLog] = useState([]);

    const handleSubmit = async () => {
        axios
            .post('/sentiment', { prompt })
            .then((data) => {
                const chatResponse = data?.data?.choices[0]?.message?.content;
                setLog([
                    ...log,
                    { role: 'user', content: prompt },
                    { role: 'assistant', content: chatResponse },
                ]);
                setResponse(chatResponse);
            })
            .catch((err) => console.error(err));
    };

    console.log(log);

    return (
        <div className="w-7/12 mx-auto flex flex-col items-center">
            <div className="flex gap-3 items-center">
                <textarea
                    className="border w-80 focus:outline-none resize-none"
                    value={prompt}
                    rows={3}
                    onChange={(e) => setPrompt(e.target.value)}
                />
                <button className="border px-3 py-2" onClick={handleSubmit}>
                    Submit
                </button>
            </div>
            <div className="flex flex-col gap-6 ">
                {log?.map((msg) => (
                    <p>
                        <b>{msg.role}</b> - {msg.content}
                    </p>
                ))}
            </div>
        </div>
    );
}

export default Journal;
