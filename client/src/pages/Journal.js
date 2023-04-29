import axios from 'axios';
import React, { useState } from 'react';
import './Journal.css';
import { useMutation, useQuery } from '@apollo/client';
import { ENTRIES_BY_ACCOUNT } from '../gql/queries';
import { useAuth } from '../auth/AuthContext';
import JournalCalendar from '../components/journal/JournalCalendar';
import { CREATE_ENTRY } from '../gql/mutations';

function Journal() {
    const { currentUser } = useAuth();

    const [prompt, setPrompt] = useState('');
    const [selected, setSelected] = useState(new Date());

    const [createEntry, { mData, mLoading, mError }] =
        useMutation(CREATE_ENTRY);

    const { loading, error, data } = useQuery(ENTRIES_BY_ACCOUNT, {
        fetchPolicy: 'network-only',
        variables: {
            accountId: currentUser?.uid,
        },
    });
    if (error) console.log(error);

    const getSentiment = async (content) => {
        return axios
            .post('/sentiment', { prompt: content })
            .then((data) => {
                return data?.data?.choices[0]?.message?.content;
            })
            .catch((err) => {
                return err;
            });
    };

    console.log(prompt);

    const handleSubmit = () => {
        getSentiment(prompt).then((sentiment) => {
            createEntry({
                variables: {
                    input: {
                        sentiment,
                        date: selected.toISOString().slice(0, 10),
                        content: prompt,
                        accountId: currentUser?.uid,
                    },
                },
                refetchQueries: [{ query: ENTRIES_BY_ACCOUNT }],
            }).then((data) => {
                console.log(data?.data);
            });
            console.log(sentiment);
        });
    };

    const checkDate = () => {
        const entry = data?.entriesByAccount?.find(
            (entry) => entry.date === selected.toISOString().slice(0, 10),
        );

        if (entry)
            return (
                <>
                    <h1 className="text-2xl font-semibold mt-8">
                        View Previous Entry
                    </h1>
                    <div className="flex flex-col w-full">
                        <div className="fw-full mt-4">
                            <p className="font-semibold">Entry Date</p>
                            {entry?.date}
                        </div>
                        <div class="w-full mt-4">
                            <p className="font-semibold">Entry Content</p>
                            <p>{entry?.content}</p>
                        </div>
                    </div>
                </>
            );
        else
            return (
                <>
                    <h1 className="text-2xl font-semibold mt-8">
                        Make New Entry
                    </h1>
                    <div class="w-full mt-4">
                        <p className="font-semibold">Entry Content</p>
                        <textarea
                            class="w-full h-32 px-5 py-2.5 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg focus:outline-none"
                            placeholder="Today I am feeling..."
                            value={prompt}
                            onChange={(e) => setPrompt(e.target.value)}
                        />
                    </div>
                    <div className="flex mt-4 items-center justify-between w-full">
                        <div class="w-full flex flex-col items-start justify-center">
                            <p className="font-semibold">Entry Date</p>
                            <p>{selected.toISOString().slice(0, 10)}</p>
                        </div>
                        <button
                            onClick={handleSubmit}
                            className="w-full flex justify-center bg-blue-600 hover:bg-blue-800 text-gray-100 p-3 rounded-full tracking-wide font-semibold shadow-lg cursor-pointer transition ease-in duration-200"
                        >
                            Submit Entry
                        </button>
                    </div>
                </>
            );
    };

    return (
        <div className="w-7/12 mx-auto flex flex-col items-center">
            <JournalCalendar
                data={data}
                value={selected}
                onChange={setSelected}
            />
            {checkDate()}
        </div>
    );
}

export default Journal;
