import * as React from "react";

interface TabCounterProps {
    count: number;
}

export const TabCounter: React.FC<TabCounterProps> = ({count}) => {
    return (
        <div className="tab-count-wrapper">
        <h4>You currently have <span className="tab-count">{count}</span> tabs open</h4>
      </div>
    )
}