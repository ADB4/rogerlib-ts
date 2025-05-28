import React, { useEffect, useState, useLayoutEffect, useContext } from 'react';
import QuoteComponent from './quoteComponent';
import Markdown from 'react-markdown';
import { ColorModeContext, useColorModeContext } from '../context/galleryContext';
import { Link } from "react-router";
import { useDevice } from '../hooks/useDevice';

export default function HomeComponent({ outData }) {
    const [visible, setVisible] = useState(false);
    const [base, setBase] = useState(
        "###### &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;*\"I am crouched, half hidden but feeling very vulnerable, behind a drudge, peering through tall weeds into a barren valley. The huge plane eventually lands in the clearing and comes to a rest. I am momentarily relieved, but soon a hatch opens in the plane's belly and out flies a smaller silver airplane to begin the search all over again. I am frozen in terror. Just as the plane spots me I wake up.\"*  "
    );
    const [title, setTitle] = useState("");
    const { darkMode, setDarkMode } = useColorModeContext();
    const { compactView, setCompactView } = useDevice();

    function toggleNavigation() {
        setVisible(!visible);
    }
    useLayoutEffect(() => {
        const data = {
            'backgroundColors': ["black","white"],
            'textColors': ["white","black"],
            'beanColors': ["white","black"],
            'beanTextColors': ["black","white"],
        };
        outData(true, data);
    }, []);

    const beanOff = darkMode ? "black":"#07215c";
    const beanColor = {
        boxShadow: visible ? "rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px, rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset": "none",
        backgroundColor: visible ? "#aaff0d":beanOff,
        WebKitTransition: "all 0.5s ease",
        transition: "all 0.15s ease",
        MozTransition: "all 0.15s ease",
    };
    const landingNavCompactItem = {
        backgroundColor: darkMode ? "#11171f":"#0d2e7a",
        border: darkMode ? "":"",
        WebKitTransition: "all 0.5s ease",
        transition: "all 0.15s ease",
        MozTransition: "all 0.15s ease",
    };
    const landingToggleButton = {
        boxShadow: darkMode ? "white 0px -50px 36px -28px inset":"none",
        backgroundColor: darkMode ? "#aaadb5":"#0c3fb5",
        border: darkMode ? "2px solid #161c33":"2px solid #1452e0",
        WebKitTransition: "all 0.5s ease",
        transition: "all 0.15s ease",
        MozTransition: "all 0.15s ease",
    };
    const landingNavExternal = {
        fontWeight: "200",
        WebKitTransition: "all 0.5s ease",
        transition: "all 0.15s ease",
        MozTransition: "all 0.15s ease",
    };
    const graphicCircle = {
        WebKitTransition: "all 0.15s ease",
        transition: "all 0.15s ease",
        MozTransition: "all 0.15s ease",
    };
    const landingContainer = {
        WebKitTransition: "all 1s ease 0s normal forwards 1 fadeInDelayed",
        transition: "all 1s ease 0s normal forwards 1 fadeInDelayed",
        MozTransition: "all 1s ease 0s normal forwards 1 fadeInDelayed",
    };
    return (
    <>
        <div className="root-container-inner"
             style={landingContainer}>
            <QuoteComponent url="/api/v1/quotes/random/"/>
            <nav id="root-nav-desktop-container">
                <h2>{compactView ? "RML":"Roger Motorsports Library"}</h2>
                    <Link to="/gallery"
                          className="root-nav-desktop-link">
                        <div className="root-nav-header-flex">
                            <h3>ENTER</h3>
                        </div>
                    </Link>
            </nav>
        </div>
    </>
    );
}
/*
        <div className="markdown-landing-container" style={aboutparagraph}>
            <Markdown className="markdown-landing">{content}</Markdown>
        </div>
        {!compactView && (
        <>
            <footer className="landing-footer">
                <img className="graphic-rml" src="https://d2fhlomc9go8mv.cloudfront.net/static/graphics/RML_white.png" alt="Roger Motorsports Library logo, white"/>
                <h4 style={footerText}>{footer}</h4>
            </footer>
        </>
        )}
        */