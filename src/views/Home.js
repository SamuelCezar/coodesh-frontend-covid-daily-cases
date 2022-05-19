import React, { useState } from 'react';
import ReactTooltip from "react-tooltip";
import HomeActions from "../actions/HomeActions";

export default function Home() {
    const [content, setContent] = useState("");

    return (
        <div>
            {/*<Link to='/'><ButtonComeBack>Return Home</ButtonComeBack></Link>*/}
            <HomeActions setTooltipContent={setContent}/>
            <ReactTooltip>{content}</ReactTooltip>
        </div>
    );
}