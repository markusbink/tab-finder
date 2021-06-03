import React from "react";
import { useTabContext } from "../contexts/TabContext";

interface GroupActionBarProps {
    denyTitle: string;
    denyAction: () => void;
    successTitle: string;
    successAction: () => void;
}

export const GroupActionBar: React.FC<GroupActionBarProps> = ({denyTitle, denyAction, successTitle, successAction}) => {
    const {isGroupActionBarVisible} = useTabContext();

    return (
        <div className={`group-action-bar ${isGroupActionBarVisible ? 'visible': ''}`}>
            <button onClick={() => denyAction()}className="action deny">{denyTitle}</button>
            <button onClick={() => successAction()}className="action success">{successTitle}</button>
        </div>
    )

}