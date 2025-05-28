// Example Contact Component
import React, { useState, useContext } from 'react';
import { ColorModeContext, useColorModeContext } from '../context/galleryContext';
import { useEffect } from 'react';
import { useDevice } from '../hooks/useDevice';

export default function QuoteComponent() {
    const { darkMode, setDarkMode } = useColorModeContext();
    const [activeQuote, setActiveQuote] = useState({
            'content': "I am crouched, half hidden but feeling very vulnerable, behind a drudge, peering through tall weeds into a barren valley. The huge plane eventually lands in the clearing and comes to a rest. I am momentarily relieved, but soon a hatch opens in the plane's belly and out flies a smaller silver airplane to begin the search all over again. I am frozen in terror. Just as the plane spots me I wake up.",
            'author': "Pippa Garner; Unpublished, 1992",
    });
    const { compactView, setCompactView } = useDevice();
    const fontsize = compactView ? "1.5rem":"2.0rem";
    const textColor = {
        fontSize: fontsize,
        lineHeight: fontsize,
        color: darkMode ? "white":"black",
        transition: "all .5s ease",
        WebKitTransition: "all .5s ease",
        MozTransition: "all .5s ease",
    };
    const author = {
        fontSize: fontsize,
        lineHeight: fontsize,
        textAlign: "right",
        color: darkMode ? "white":"black",
        transition: "all .5s ease",
        WebKitTransition: "all .5s ease",
        MozTransition: "all .5s ease",
    };
    const contentContainer = {
        maxWidth: compactView ? "calc(100% - 1rem)":"calc(100% - 8rem)",
    };
    return (
    <>
        <div className="quote-container-outer">
                <div className="quote-content-container"
                     style={contentContainer}>
                        <p style={textColor}><i>"{activeQuote.content}"</i></p>
                        <p style={author}><i>- {activeQuote.author}</i></p>
                </div>
        </div>
    </>
    );
}

/*
                <button id="quote-refresh">
                    <p style={textColor} onClick={()=> {handleInquiry()}}>REFRESH</p>
                </button>
                */
