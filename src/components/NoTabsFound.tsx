import * as React from "react";
import {Error} from "../assets/icons/Error";

export const NoTabsFound: React.FC = () => {
    return (

        <div className="no-tabs-found">
            <Error/>
            <h4>Oops...</h4>
            <p>No tabs match your search term.</p>
        </div>

    )
}