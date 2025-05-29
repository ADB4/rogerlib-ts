import * as React from "react"
import { useState } from "react";
import PropTypes from "prop-types";

// import ModelViewerComponent from "./modelViewer";
import { ItemType, DetailContext, useDetailContext, useColorModeContext} from "../context/galleryContext";
import { useDevice } from "../hooks/useDevice";
import { compactDescriptionHeader, compactExitButton } from "../style/modelDetailStyles";
import ModelViewerComponent from "../component/modelViewer";
import DetailDescriptionComponent from "../component/detailDescriptionComponent";

export default function DetailContainerComponent({ inData, outData }) {
    const compactView = useDevice();
    const darkMode = useColorModeContext();
    const [toggleView, setToggleView] = useState(true);

    function handleClose() {
        outData();
    }
    function handleToggleView() {
        setToggleView(!toggleView);
    }
    let exitButtonStyle = {};

    let baseResolution = 320;
    let tilesX: number = 3;
    let tilesY: number = 3;
    let scaledResolution: number = baseResolution;
    let detailContainerHeight: number = baseResolution;
    let detailContainerWidth: number = baseResolution;
        // standard desktop view
    scaledResolution = 320 * 1.5;
    detailContainerWidth = scaledResolution * 2;
    
    let detailOuterContainer = {};
    let detailLeft: React.CSSProperties = {};
    let detailRight: React.CSSProperties = {};
    let detailToggle: React.CSSProperties = {};
    let detailToggleDark: React.CSSProperties = {};
    let detailToggleText: React.CSSProperties = {};
    // height is image resolution + height of view dashboard (8rem) + height of item header (6rem)
    detailContainerHeight = scaledResolution + 192;
    // mobile view
    if (compactView == true) {
        scaledResolution = 256;
        let imageresolution = "85vw";
        let containerheight = "calc(85vw + 14.5rem";
        detailContainerHeight = scaledResolution + 192;
        // left container for model viewer
        detailLeft = {
            gridColumnStart: "1",
            gridColumnEnd: "-1",
            gridRowStart: "1",
            gridRowEnd: "-1",
            height: "100%",
            maxHeight: containerheight,
            width: "auto",
            minWidth: scaledResolution+"px",
            display: "grid",
            gridTemplateColumns: "auto",
            gridTemplateRows: "4rem auto 10.5rem",
            WebkitTransition: "1s ease 0s normal forwards 1 fadeIn",
            transition: "1s ease 0s normal forwards 1 fadeIn",
        };
        detailRight = {
            gridColumnStart: "1",
            gridColumnEnd: "-1",
            gridRowStart: "1",
            gridRowEnd: "-1",
            height: "100%",
            width: "auto",
            minWidth: scaledResolution+"px",
            display: "grid",
            gridTemplateColumns: "auto",
            gridTemplateRows: "4rem auto 10.5rem",
            outline: "1px solid #C6C6C6",
            WebkitTransition: "1s ease 0s normal forwards 1 fadeIn",
            transition: "1s ease 0s normal forwards 1 fadeIn",
        };
        detailToggle = {
            backgroundColor: toggleView ? ("#E5FFFE") : ("#F9FFC7"),
        };
        detailToggleDark = {
            border: "none",
            backgroundColor: toggleView ? ("#CBE3E2") : ("#E1E7A7"),
        };
        detailToggleText = {
            color: toggleView ? ("#3B6F88") : ("#7C4E00"),
        };
    } else {
        scaledResolution = 512;
        detailContainerHeight = scaledResolution + 192;
        // left container for model viewer
        detailLeft = {
            height: detailContainerHeight + "px",
            minWidth: scaledResolution+"px",
        };
        detailRight = {
            height: detailContainerHeight + "px",
            minWidth: scaledResolution+"px",
        };
    }
    let descriptionWhitespace = {
        height: compactView ? ("4rem") : ("3rem"),
        width: "100%",
        borderRadius: "0.75rem",
    };
    exitButtonStyle = compactExitButton;
    const textColor: React.CSSProperties = {
        color: darkMode? "black":"black",
        backgroundColor: darkMode ? "#E5FFFE":"white",
    };
    const desktopDescriptionHeader: React.CSSProperties = {
        gridColumnStart: "1",
        gridColumnEnd: "-1",
        gridRowStart: "1",
        gridRowEnd: "2",
        height: "4rem",
        minWidth: "8rem",
        width: "100%",
        maxWidth: "16rem",
        marginTop: "1rem",
        marginLeft: "1rem",
        zIndex: "8",
        fontFamily: "Swiss721",
        fontWeight: "300",
    };
    return (
        <div style={textColor} id={compactView ? ("model-detail-container-compact"):("model-detail-standard-container")}>
            <div className="exit-button" style={exitButtonStyle} onClick={() => {handleClose()}}>
                    <p>CLOSE</p>
            </div>
            <DetailContext.Provider value={{'item': inData.item, 'imageresolution': scaledResolution}}>
            {compactView && (
                <>
                {toggleView && (
                    <div id="model-detail-container-innerA" style={detailLeft}>
                    </div>
                )}
                {!toggleView && (
                    <div id="model-detail-container-innerB" style={detailRight}>
                        <DetailHeaderComponent inData={{'item': inData.item,
                                                'style': compactDescriptionHeader}}/>
                        <div className="model-detail-actions">
                            <div className="description-download-container">
                            </div>
                            <div className="model-detail-toggle-container" style={detailToggle}>
                                <button className="model-detail-toggle-container-inner" style={detailToggleDark} onClick={() => {handleToggleView()}}><p style={detailToggleText}>TOGGLE MODEL VIEWER</p></button>
                            </div>
                        </div>
                    </div>
                )}
                </>
            )}
            {!compactView && (
                <>
                    <div id="model-detail-standard-left" style={detailLeft}>
                        <ModelViewerComponent inData={{item: inData.item, imageresolution: scaledResolution}} outData={handleToggleView}/>
                    </div>
                    <div id="model-detail-standard-right" style={detailRight}>
                        <DetailHeaderComponent inData={{'item': inData.item,
                                                'style': desktopDescriptionHeader}}/>
                        <DetailDescriptionComponent inData={{'item': inData.item,
                                                            'imageresolution': scaledResolution,
                                                            'containerheight': detailContainerHeight,
                                                            'style': compactDescriptionHeader}}/>
                        <div className="model-detail-actions">
                            <div className="description-download-container">

                            </div>
                        </div>

                    </div>
                </>
            )}
            </DetailContext.Provider>
        </div>
    )
}

export function DetailHeaderComponent({ inData }) {    
    return (
        <div id="description-header" style={inData.style}>
                <h2>{inData.item.itemname}</h2>
                <ul>
                    <li>VERSION {inData.item.version}</li>
                    <li>{inData.item.category.toUpperCase()} / {inData.item.subcategory.toUpperCase()}</li>
                </ul>
        </div>
    )
}
/*
                        <DetailDescriptionComponent inData={{'item': inData.item,
                                                            'imageresolution': scaledResolution,
                                                            'containerheight': detailContainerHeight,
                                                            'style': compactDescriptionHeader}}/>
*/