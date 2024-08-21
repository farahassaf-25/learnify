import React, { useState } from 'react';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';

const Accordion = ({ title, content }) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleOpen = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className="border-b">
            <button
                className="w-full text-left p-4 bg-gray-100 hover:bg-gray-200 flex justify-between items-center"
                onClick={toggleOpen}
            >
                <h3 className="text-lg font-semibold">{title}</h3>
                <span>{isOpen ? <FaChevronUp /> : <FaChevronDown />}</span>
            </button>
            {isOpen && (
                <div className="p-4 bg-white">
                    {content.includes('http') ? (
                        <video controls className="w-full">
                            <source src={content} type="video/mp4" />
                            Your browser does not support the video tag.
                        </video>
                    ) : (
                        <p className="text-gray-700">{content}</p>
                    )}
                </div>
            )}
        </div>
    );
};

export default Accordion;
