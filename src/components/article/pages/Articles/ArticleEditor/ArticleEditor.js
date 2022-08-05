import React, { useEffect } from 'react';
import { useState } from 'react';
import stylesheet from './ArticleEditor.module.css';

// max tag length - 10 symbols (<12345678>)

const ArticleEditor = (props) => {
    const [content, setContent] = useState([]);

    let current = '';

    // onKeyPress
    const handleEnterPress = (event) => {
        if (event.key === 'Enter') {

        };
    };

    function setCaretToPos(elem, pos) {
        const range = document.createRange();
        const sel = window.getSelection();
        range.setStart(elem.childNodes[0], pos);
        range.collapse(true);
        sel.removeAllRanges();
        sel.addRange(range);
    }

    const handleInput = () => {
        current = (document.querySelector(`#${stylesheet.editor}`).innerHTML);
        const currentLength = current.length;

        const currentSymbols = [];
        let i = 0;
        while (i < currentLength) {
            if (current[i] === '&') {
                const startTag = '&lt;';
                const endTag = '&gt;';
                const candidateTag = current[i] + current[i + 1] + current[i + 2] + current[i + 3];
                const isStartTag = candidateTag === startTag;
                const isEndTag = candidateTag === endTag;

                const space = '&nbsp;';
                const candidateSpace = current[i] + current[i + 1] + current[i + 2] + current[i + 3] + current[i + 4] + current[i + 5];
                const isSpace = candidateSpace === space;

                const amp = '&amp;';
                const candidateAmp = current[i] + current[i + 1] + current[i + 2] + current[i + 3] + current[i + 4];
                const isAmp = candidateAmp === amp;

                if (isStartTag) {
                    currentSymbols.push("<");
                    i = i + 4;
                } else if (isEndTag) {
                    currentSymbols.push('>');
                    i = i + 4;
                } else if (isSpace) {
                    currentSymbols.push(' ');
                    i = i + 6;
                } else if (isAmp) {
                    currentSymbols.push('&');
                    i = i + 5;
                } else {
                    currentSymbols.push(current[i]);
                    i++;
                };
            } else {
                currentSymbols.push(current[i]);
                i++;
            };
        };

        const withCandidateTags = [];
        let j = 0;
        while (j < currentSymbols.length) {
            if (currentSymbols[j] === '<') {
                const candidateTag = [];
                let m = 0;
                let mValue = null;
                while (m < 10) {
                    if (!mValue) {
                        candidateTag.push(currentSymbols[m + j])
                        if (currentSymbols[m + j] === '>') {
                            mValue = m;
                        };
                    };
                    m++;
                };
                if (currentSymbols[j + mValue] === '>') {
                    const tag = candidateTag.join('');
                    withCandidateTags.push(tag);
                    j = j + mValue + 1;
                } else {
                    withCandidateTags.push(currentSymbols[j]);
                    j++;
                };
            } else {
                withCandidateTags.push(currentSymbols[j]);
                j++;
            };
        };

        let withValidatedTags = [];
        let k = 0;
        while (k < withCandidateTags.length) {
            const candidate = withCandidateTags[k];
            if (withCandidateTags[k].length > 1) {
                switch (candidate) {
                    case '<b>':
                        withValidatedTags.push(candidate);
                        break;
                    default:
                        const splittedCandidate = candidate.split('');
                        withValidatedTags = withValidatedTags.concat(splittedCandidate);
                };
            } else {
                withValidatedTags.push(candidate);
            };
            k++;
        };
        console.log(withValidatedTags);
    };

    const setCaret = () => {
        const num = content.length;
        setCaretToPos(document.querySelector(`#${stylesheet.editor}`), num);
    };
    // onKeyPress


    return (
        <div>
            <div>
                <div onInput={handleInput} id={stylesheet.editor} className={stylesheet.editor} contentEditable>{content}</div>
            </div>
            <div>{content}</div>
        </div>

    )
};

export default ArticleEditor;