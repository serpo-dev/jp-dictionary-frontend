import React, { cloneElement, useEffect, useState } from 'react';
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

        let pos = window.getSelection().focusOffset
        const selection = window.getSelection();

        const object = document.querySelector(`#${stylesheet.editor}`);
        let html = object.innerHTML;

        for (let x = 0; x < object.childNodes.length; x++) {
            switch (object.childNodes[x].nodeName) {
                case 'DIV':
                    break;
                case '#text':
                    let textToDiv = document.createElement('div');
                    const childText = document.createTextNode(object.childNodes[x].textContent);
                    textToDiv.appendChild(childText);
                    object.replaceChild(textToDiv, object.childNodes[x]);
                    break;
                case 'BR':
                    let brToDiv = document.createElement('div');
                    const childBr = document.createTextNode(' ');
                    brToDiv.appendChild(childBr);
                    object.replaceChild(brToDiv, object.childNodes[x]);
                    break;
                default:
                    let ElemToDiv = document.createElement('div');
                    const childElem = object.childNodes[x].cloneNode(true);
                    ElemToDiv.appendChild(childElem);
                    object.replaceChild(ElemToDiv, object.childNodes[x]);
            };
        };

        for (let x = 0; x < object.childaNodes.length; x++) {
            for (let y = 0; y < object.childNodes[x].childNodes.length; y++) {
                switch (object.childNodes[x].childNodes[y].nodeName) {
                    case 'SPAN':
                        break;
                    case '#text':
                        let textToDiv = document.createElement('span');
                        const childText = document.createTextNode(object.childNodes[x].childNodes[y].textContent);
                        textToDiv.appendChild(childText);
                        object.childNodes[x].replaceChild(textToDiv, object.childNodes[x].childNodes[y]);
                        break;
                    case 'BR':
                        let brToDiv = document.createElement('span');
                        const childBr = document.createTextNode(' ');
                        brToDiv.appendChild(childBr);
                        object.childNodes[x].replaceChild(brToDiv, object.childNodes[x].childNodes[y]);
                        break;
                    default:
                        let ElemToDiv = document.createElement('span');
                        const childElem = object.childNodes[x].childNodes[y].cloneNode(true);
                        ElemToDiv.appendChild(childElem);
                        object.childNodes[x].replaceChild(ElemToDiv, object.childNodes[x].childNodes[y]);
                };
            };
        };


        for (let x = 0; x < object.childNodes.length; x++) {
            let length = object.childNodes[x].childNodes.length;
            for (let y = 0; y < length - 1; y++) {
                const currentClass = object.childNodes[x].childNodes[y] ? object.childNodes[x].childNodes[y].className : null;
                const nextClass = object.childNodes[x].childNodes[y + 1] ? object.childNodes[x].childNodes[y + 1].className : null;
                const firstCondition = currentClass === nextClass;
                const secondCondition = !currentClass && !nextClass;
                if (firstCondition || secondCondition) {
                    const add = object.childNodes[x].childNodes[y + 1].childNodes;
                    const current = object.childNodes[x].childNodes[y];
                    let combine = current.cloneNode(true);
                    for (let o = 0; o < add.length; o++) {
                        combine.appendChild(add[o].cloneNode(true));
                    };
                    const remove = object.childNodes[x].childNodes[y + 1];
                    object.childNodes[x].replaceChild(combine, current);
                    object.childNodes[x].removeChild(remove);
                    y = y - 1;
                    length = length - 1;
                };
            };
        };

        // const recreacteInner = (node, inner) => {
        //     if (node.childElementCount === 0) {
        //         const text = node.innerText ? node.innerText : ' ';
        //         inner = inner.split(' ')[0] + text + inner.split(' ')[1];
        //         node.innerHTML = inner;
        //     };
        // };

        // const startHTML = `<div><span> </span></div>`;
        // const innerDiv = `<span> </span>`;
        // recreacteInner(object, startHTML);
        // for (let i = 0; i < object.childElementCount; i++) {
        //     const isDiv = object.childNodes[i].nodeName === 'DIV';
        //     const isNotDivText = object.childNodes[i].nodeName === '#text';
        //     if (!isDiv) {
        //         const removedNode = object.childNodes[i];
        //         const removedNodeText = isNotDivText ? removedNode.textContent : removedNode.innerText;
        //         const recreatedNode = document.createElement('div');
        //         if (removedNodeText) {
        //             const recreatedNodeText = document.createTextNode(removedNodeText);
        //             recreatedNode.appendChild(recreatedNodeText);
        //         };
        //         object.replaceChild(recreatedNode, removedNode);
        //         recreacteInner(object, startHTML);
        //     };
        //     recreacteInner(object.childNodes[i], innerDiv);
        //     for (let j = 0; j < object.childNodes[i].childNodes.length; j++) {
        //         const isSpan = object.childNodes[i].childNodes[j].nodeName === 'SPAN';
        //         const isSpanText = object.childNodes[i].childNodes[j].nodeName === '#text';
        //         if (!isSpan) {
        //             const removedNode = object.childNodes[i].childNodes[j];
        //             const removedNodeText = isSpanText ? removedNode.textContent : removedNode.cloneNode(true);
        //             const recreatedNode = document.createElement('span');
        //             if (removedNodeText) {
        //                 const recreatedNodeText = isSpanText ? document.createTextNode(removedNodeText) : removedNodeText;
        //                 recreatedNode.appendChild(recreatedNodeText);
        //             };
        //             object.childNodes[i].replaceChild(recreatedNode, removedNode);
        //             recreacteInner(object.childNodes[i], innerDiv);
        //         };

        //         let matches = [];
        //         let matchNode = 0
        //         let matchCount = 0;
        //         for (let u = 0; u < object.childNodes[i].childNodes.length; u++) {
        //             if (object.childNodes[i].childNodes[u].className === object.childNodes[i].childNodes[u + 1].className) {
        //                 matchCount++;
        //             } else {
        //                 if (matchCount !== 0) {
        //                     matches.push({ matchNode, matchCount });
        //                     matchCount = 0;
        //                 };
        //                 matchNode = u + 1;
        //             };
        //             console.log('FOOOOOOOOOR')
        //         };
        //         console.log(matches);
        //         console.log('!!!!!!!!!!!!')

        // if (object.childNodes[i].childNodes[j].childElementCount !== 0) {
        //     for (let k = 0; k < object.childNodes[i].childNodes[j].childNodes.length; k++) {
        //         switch (object.childNodes[i].childNodes[j].childNodes[k].nodeName) {
        //             case 'B':
        //                 const removedNodeB = object.childNodes[i].childNodes[j].childNodes[k];
        //                 const removedNodeBText = removedNodeB.innerText ? removedNodeB.innerText : ' ';
        //                 const recreatedNodeBText = document.createTextNode(removedNodeBText);
        //                 object.childNodes[i].childNodes[j].replaceChild(recreatedNodeBText, removedNodeB);
        //                 object.childNodes[i].childNodes[j].className = 
        //                 object.childNodes[i].childNodes[j].className === 'font-bold' ? 'font-normal' : 'font-bold';
        //                 break;
        //             default:
        //                 const removedNode = object.childNodes[i].childNodes[j].childNodes[k];
        //                 const removedNodeText = removedNode.innerText ? removedNode.innerText : ' ';
        //                 const recreatedNodeText = document.createTextNode(removedNodeText);
        //                 object.childNodes[i].childNodes[j].replaceChild(recreatedNodeText, removedNode);
        //         };
        //     };
        // };
        //     };
        // };


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
    };

    const handleKeyPress = (event) => {
        const endNum = contentHistory.length - 1;
        const object = document.querySelector(`#${stylesheet.editor}`);

        //  Выделяем весь текст после обновления блока, чтобы курсор переносился не
        //  в его начало.
        const setRange = () => {
            const range = new Range();
            range.setStart(object, object.childNodes.length);
            range.setEnd(object, object.childNodes.length);
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

    const click = () => {
        const select = window.getSelection();
        console.log(select);
    }

    return (
        <div>
            <button onClick={click}>click on me</button>
            <div onKeyDown={handleKeyPress} onInput={handleText} id={stylesheet.editor} className={stylesheet.editor} contentEditable >
                <div><span> </span></div>
            </div>
        </div>
    )
};

export default ReactTE;