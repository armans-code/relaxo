import React, { useState } from 'react';
import { Calendar } from 'react-calendar';

function JournalCalendar({ data, value, onChange }) {
    return (
        <Calendar
            value={value}
            onChange={onChange}
            calendarType="US"
            tileClassName={({ date }) => {
                const entry = data?.entriesByAccount?.find(
                    (entry) => entry.date === date.toISOString().slice(0, 10),
                );

                if (
                    value.toISOString().slice(0, 10) ==
                    date.toISOString().slice(0, 10)
                )
                    return '!bg-blue-500 hover:!bg-blue-600 transition-colors text-white rounded-3xl !font-bold';
                else if (entry)
                    switch (entry?.sentiment) {
                        case 'positive':
                            return '!bg-green-500 hover:!bg-green-600 transition-colors text-white rounded-3xl';
                        case 'neutral':
                            return '!bg-gray-400 hover:!bg-gray-500 transition-colors text-white rounded-3xl';
                        case 'negative':
                            return '!bg-red-500 hover:!bg-red-600 transition-colors text-white rounded-3xl';
                        default:
                            return 'rounded-3xl';
                    }
                else if (
                    date.toISOString().slice(0, 10) ==
                    new Date().toISOString().slice(0, 10)
                )
                    return '!bg-white hover:!bg-gray-200 rounded-3xl !font-bold';
            }}
        />
    );
}

export default JournalCalendar;
