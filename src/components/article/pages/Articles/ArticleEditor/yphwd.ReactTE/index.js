import React, { useEffect, useState } from 'react';
import stylesheet from './index.module.css';

// max tag length - 102 symbols (<1-100>)

const ReactTE = (props) => {
    const [contentHistory, setContentHistory] = useState([]);
    const [waybackCount, setWaybackCount] = useState(0);

    useEffect(() => {
        let newContent = contentHistory;
        newContent.push(`<div><span> </span></div>`);
        setContentHistory(newContent);
    }, []);

    const handleText = () => {
        let pos = window.getSelection().focusOffset;
        let div = window.getSelection().focusNode.parentNode.parentNode.childElementCount
        const selection = window.getSelection();

        const object = document.querySelector(`#${stylesheet.editor}`);
        let html = object.innerHTML;

        const recreacteInner = (node, inner) => {
            if (node.childElementCount === 0) {
                const text = node.innerText ? node.innerText : ' ';
                inner = inner.split(' ')[0] + text + inner.split(' ')[1];
                node.innerHTML = inner;
            };
        };

        const startHTML = `<div><span> </span></div>`;
        const innerDiv = `<span> </span>`;
        recreacteInner(object, startHTML);
        for (let i = 0; i < object.childElementCount; i++) {
            const isDiv = object.childNodes[i].nodeName === 'DIV';
            const isNotDivText = object.childNodes[i].nodeName === '#text';
            if (!isDiv) {
                const removedNode = object.childNodes[i];
                const removedNodeText = isNotDivText ? removedNode.textContent : removedNode.innerText;
                const recreatedNode = document.createElement('div');
                if (removedNodeText) {
                    const recreatedNodeText = document.createTextNode(removedNodeText);
                    recreatedNode.appendChild(recreatedNodeText);
                };
                object.replaceChild(recreatedNode, removedNode);
                recreacteInner(object, startHTML);
            };
            recreacteInner(object.childNodes[i], innerDiv);
            for (let j = 0; j < object.childNodes[i].childNodes.length; j++) {
                const isSpan = object.childNodes[i].childNodes[j].nodeName === 'SPAN';
                const isNotSpanText = object.childNodes[i].childNodes[j].nodeName === '#text';
                if (!isSpan) {
                    const removedNode = object.childNodes[i].childNodes[j];
                    const removedNodeText = isNotSpanText ? removedNode.textContent : removedNode.cloneNode(true);
                    const recreatedNode = document.createElement('span');
                    if (removedNodeText) {
                        const recreatedNodeText = isNotSpanText ? document.createTextNode(removedNodeText) : removedNodeText;
                        recreatedNode.appendChild(recreatedNodeText);
                    };
                    object.childNodes[i].replaceChild(recreatedNode, removedNode);
                    recreacteInner(object.childNodes[i], innerDiv);
                };
                if (object.childNodes[i].childNodes[j].childElementCount !== 0) {
                    for (let k = 0; k < object.childNodes[i].childNodes[j].childNodes.length; k++) {
                        switch (object.childNodes[i].childNodes[j].childNodes[k].nodeName) {
                            case 'B':
                                const removedNodeB = object.childNodes[i].childNodes[j].childNodes[k];
                                const removedNodeBText = removedNodeB.innerText ? removedNodeB.innerText : ' ';
                                const recreatedNodeBText = document.createTextNode(removedNodeBText);
                                object.childNodes[i].childNodes[j].replaceChild(recreatedNodeBText, removedNodeB);
                                object.childNodes[i].childNodes[j].className = 
                                object.childNodes[i].childNodes[j].className === 'font-bold' ? 'font-normal' : 'font-bold';
                                break;
                            default:
                                const removedNode = object.childNodes[i].childNodes[j].childNodes[k];
                                const removedNodeText = removedNode.innerText ? removedNode.innerText : ' ';
                                const recreatedNodeText = document.createTextNode(removedNodeText);
                                object.childNodes[i].childNodes[j].replaceChild(recreatedNodeText, removedNode);
                        };
                    };
                };
            };
        };


        let cloneContentHistory = contentHistory;
        if (waybackCount > 0) {
            cloneContentHistory.length = cloneContentHistory.length - waybackCount;
            setWaybackCount(0);
        };
        if (cloneContentHistory.length > 50) {
            cloneContentHistory.shift();
        };
        const currentHtml = document.querySelector(`#${stylesheet.editor}`).innerHTML;
        cloneContentHistory.push(currentHtml);
        setContentHistory(cloneContentHistory);
        console.log(contentHistory)
    };

    const handleKeyPress = (event) => {
        const endNum = contentHistory.length - 1;
        const object = document.querySelector(`#${stylesheet.editor}`);

        //  Выделяем весь текст после обновления блока, чтобы курсор переносился не
        //  в его начало.
        const setRange = () => {
            const range = new Range();
            range.setStart(object, 0);
            range.setEnd(object, 1);
            document.getSelection().removeAllRanges();
            document.getSelection().addRange(range);
        };

        if (event.ctrlKey && event.keyCode === 90) {
            if (waybackCount < endNum) {
                const newCount = waybackCount + 1;
                const num = endNum - newCount;
                object.innerHTML = contentHistory[num];
                setWaybackCount(newCount);
                setRange();
            };
            event.preventDefault();
        } else if (event.ctrlKey && event.keyCode === 89) {
            if (waybackCount < endNum + 1) {
                if (waybackCount > 0) {
                    const newCount = waybackCount - 1;
                    const num = endNum - newCount;
                    object.innerHTML = contentHistory[num];
                    setWaybackCount(newCount);
                    setRange();
                };
            };
            event.preventDefault();
        };
    };

    return (
        <div>
            <div onKeyDown={handleKeyPress} onInput={handleText} id={stylesheet.editor} className={stylesheet.editor} contentEditable >
                <div><span> </span></div>
            </div>
        </div>
    )
};

export default ReactTE;