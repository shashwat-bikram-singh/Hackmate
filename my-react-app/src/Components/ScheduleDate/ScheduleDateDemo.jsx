import React from 'react';
import { ScheduleDate } from './original';

const ScheduleDateDemo = ({ onApply, onCancel }) => {
    return (
        <div className="min-h-full my-2 w-full bg-transparent flex items-center justify-center transition-colors">
            <ScheduleDate 
                onApply={(range) => {
                    console.log("Applied:", range);
                    if (onApply) onApply(range);
                }} 
                onCancel={() => {
                    console.log("Cancelled");
                    if (onCancel) onCancel();
                }} 
            />
        </div>
    );
};

export default ScheduleDateDemo;
