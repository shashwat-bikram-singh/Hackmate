import React from "react";
import { BellIcon, MessageCircle, Tag } from "lucide-react";
import { FaCircleCheck } from "react-icons/fa6";
import { LuBadgeCheck } from "react-icons/lu";
import { TbClockHour12 } from "react-icons/tb";
import { ActivitiesCard } from "./original";

const activities = [
    {
        icon: <MessageCircle className="h-5 w-5" />,
        title: "New Message!",
        desc: "Sarah sent you a message.",
        time: "Just Now",
    },
    {
        icon: <LuBadgeCheck className="h-5 w-5" />,
        title: "Level Up!",
        desc: "You've unlocked a new achievement.",
        time: "2 min ago",
    },
    {
        icon: <TbClockHour12 className="h-5 w-5 rotate-45" />,
        title: "Reminder: Meeting Today",
        desc: "Your team meeting starts in 30 min.",
        time: "3 hour ago",
    },
    {
        icon: <Tag className="h-5 w-5 rotate-90" />,
        title: "Special Offer!",
        desc: "Save 20% off on subscription upgrade.",
        time: "12 hours ago",
    },
    {
        icon: <FaCircleCheck className="h-5 w-5" />,
        title: "Task Assigned!",
        desc: "A new task is awaiting action.",
        time: "Yesterday",
    },
];

function ActivitiesCardDemo({ defaultOpen = true, className = "" }) {
    return (
        <div className={`flex items-center justify-center w-full ${className}`}>
            <ActivitiesCard
                headerIcon={<BellIcon className="size-7 text-blue-600" />}
                title="5 New Activities"
                subtitle="What's happening around you"
                activities={activities}
                defaultOpen={defaultOpen}
            />
        </div>
    );
}

export default ActivitiesCardDemo;
