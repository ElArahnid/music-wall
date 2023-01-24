import { useRef } from "react";


export const RenCounter = props => {
    const renderCounter  = useRef(0);
    renderCounter.current = renderCounter.current + 1;
    console.log(`Renders: ${renderCounter.current}, ${props.message}`);
};