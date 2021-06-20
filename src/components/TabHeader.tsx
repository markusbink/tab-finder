import * as React from "react";
import { useTabContext } from "../contexts/TabContext";

export const TabHeader: React.FC = () => {
    const { tabCount } = useTabContext();

    return (
        <div className="header">
            <div className="logo">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="192"
                    height="192"
                    fill="#000000"
                    viewBox="0 0 256 256">
                    <rect width="256" height="256" fill="none"></rect>
                    <rect
                        x="32.00781"
                        y="80.00005"
                        width="160"
                        height="128"
                        rx="8"
                        strokeWidth="16"
                        stroke="#000000"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        fill="none"></rect>
                    <path
                        d="M64.00781,48.00005h152a8,8,0,0,1,8,8V176"
                        fill="none"
                        stroke="#000000"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="16"></path>
                </svg>
                <h2>TabFinder</h2>
                <span className="tab-count">{tabCount}</span>
            </div>
        </div>
    );
};
