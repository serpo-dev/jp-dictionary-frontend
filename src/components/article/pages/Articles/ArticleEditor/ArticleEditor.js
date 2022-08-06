import React, { useEffect } from 'react';
import { useState } from 'react';
import stylesheet from './ArticleEditor.module.css';

// max tag length - 102 symbols (<1-100>)

const ArticleEditor = (props) => {
    const [content, setContent] = useState(' ');


    console.log('SECOND GLOBAL')
    // onKeyPress
    const handleEnterPress = (event) => {
        if (event.key === 'Enter') {

        };
    };

    console.log('LOADING')
    console.log('CONTENT: ', content)

    function setCaretToPos(elem, pos) {
        const range = document.createRange();
        const sel = window.getSelection();
        range.setStart(elem.childNodes[0], pos);
        range.collapse(true);
        sel.removeAllRanges();
        sel.addRange(range);
    }

    const handleInput = () => {
        let current = (document.querySelector(`#${stylesheet.editor}`).innerHTML);

        if (current.length === 0 || current === '<br>') {
            current = 'a'
            document.querySelector(`#${stylesheet.editor}`).innerHTML = current;
            return;
        };
        console.log( document.querySelector(`#${stylesheet.editor}`))
        document.querySelector(`#${stylesheet.editor}`).innerHTML = current;
        console.log('CURRENT: ', current)

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

        let withCandidateTags = [];
        let j = 0;
        while (j < currentSymbols.length) {
            if (currentSymbols[j] === '<') {
                const candidateTag = [];
                let m = 0;
                let mValue = null;
                while (m < 102) {
                    if (!mValue) {
                        candidateTag.push(currentSymbols[m + j])
                        if (currentSymbols[m + j] === '>') {
                            mValue = m;
                            break;
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
            if (candidate.length > 1) {
                const splitToCheckSpan = candidate.split(' ');
                if (splitToCheckSpan.length > 1) {
                    if (splitToCheckSpan[0] === '<span') {
                        const splitClassMarks = splitToCheckSpan[1].split(`"`);
                        if (splitClassMarks.length > 1) {
                            const classValues = splitClassMarks[1];
                            const values = classValues.split(' ');
                            const verifiedValues = [];
                            if (values.length > 1) {
                                let g = 0;
                                while (g < values.length) {
                                    switch (values[g]) {
                                        case 'font-bold':
                                            verifiedValues.push('<b>');
                                            break;
                                        case 'italic':
                                            verifiedValues.push('<i>');
                                            break;
                                        case 'underline-offset-8':
                                            verifiedValues.push('<u>');
                                            break;
                                    };
                                    g++;
                                };
                                if (verifiedValues.length !== 0) {
                                    let u = k;
                                    let isEndSpan = false;
                                    console.log('000000000000000000000000000000000')
                                    while (u < withCandidateTags.length) {
                                        if (withCandidateTags[u] === '</span>') {
                                            isEndSpan = true;
                                            break;
                                        };
                                        u++;
                                    };
                                    if (isEndSpan) {
                                        let v = 0;
                                        const removed = withCandidateTags.splice(u - 1, 1);
                                        while (v < verifiedValues.length) {
                                            const removed = withCandidateTags.splice(u - 1, 0, verifiedValues[v]);
                                            v++
                                            u++;
                                        };
                                    }
                                    let w = 0;
                                    while (w < verifiedValues.length) {
                                        withValidatedTags.push(verifiedValues[w]);
                                        w++;
                                    };
                                } else {
                                    console.log('1) AAAA!! problem with span tag');
                                };
                            } else {
                                let o = k;
                                let isEndSpan = false;
                                while (o < withCandidateTags.length) {
                                    console.log(withCandidateTags[o])
                                    if (withCandidateTags[o] === '</span>') {
                                        isEndSpan = true;
                                        break;
                                    };
                                    o++;
                                };
                                if (isEndSpan) {
                                    const removed = withCandidateTags.splice(o - 1, 0);
                                };
                                console.log('&&&&&&&&&&&&&&&&&&&')
                            };
                        } else {
                            console.log('2_ AAAA!! problem with span tag');
                        };
                    } else {
                        withValidatedTags.push(candidate);
                    };
                } else {
                    switch (candidate) {
                        case '</span>':
                            break;
                        case '</div>':
                            break;
                        case '<div>':
                            withValidatedTags.push('<br>');
                            break;
                        case '<br>':
                            console.log('DGSSSSSSSSSSSSSSSSSSSSSSSS')
                            break;
                        case '<b>':
                            withValidatedTags.push(candidate);
                            break;
                        case '</b>':
                            withValidatedTags.push('<b>');
                            break;
                        case '<i>':
                            withValidatedTags.push(candidate);
                            break;
                        case '</i>':
                            withValidatedTags.push('<i>');
                            break;
                        case '<u>':
                            withValidatedTags.push(candidate);
                            break;
                        case '</u>':
                            withValidatedTags.push('<u>');
                            break;
                        default:
                            const splittedCandidate = candidate.split('');
                            withValidatedTags = withValidatedTags.concat(splittedCandidate);
                    };
                };
            } else {
                withValidatedTags.push(candidate);
            };
            k++;
        };
        console.log(withValidatedTags)

        let symbolsToStrings = [];
        let symbolsBetweenTags = [];
        let a = 0;
        while (a < withValidatedTags.length) {
            switch (withValidatedTags[a]) {
                case '<br>':
                    symbolsToStrings.push(symbolsBetweenTags.join(''));
                    symbolsToStrings.push(withValidatedTags[a]);
                    symbolsBetweenTags = [];
                    break;
                case '<b>':
                    symbolsToStrings.push(symbolsBetweenTags.join(''));
                    symbolsToStrings.push(withValidatedTags[a]);
                    symbolsBetweenTags = [];
                    break;
                case '<i>':
                    symbolsToStrings.push(symbolsBetweenTags.join(''));
                    symbolsToStrings.push(withValidatedTags[a]);
                    symbolsBetweenTags = [];
                    break;
                case '<u>':
                    symbolsToStrings.push(symbolsBetweenTags.join(''));
                    symbolsToStrings.push(withValidatedTags[a]);
                    symbolsBetweenTags = [];
                    break;
                default:
                    symbolsBetweenTags.push(withValidatedTags[a]);
            };
            a++;
        };
        if (symbolsBetweenTags.length !== 0) {
            symbolsToStrings.push(symbolsBetweenTags.join(''));
        }
        console.log(symbolsToStrings)

        let booleanBold = false;
        let booleanItalic = false;
        let booleanUnderlined = false;
        let convertedToHTML = [];
        let b = 0;
        while (b < symbolsToStrings.length) {
            switch (symbolsToStrings[b]) {
                case '<br>':
                    convertedToHTML.push(<br/>)
                    break;
                case '<b>':
                    booleanBold = !booleanBold;
                    break;
                case '<i>':
                    booleanItalic = !booleanItalic;
                    break;
                case '<u>':
                    booleanUnderlined = !booleanUnderlined;
                    break;
                default:
                    const styleParams = [];
                    if (booleanBold) {
                        styleParams.push('font-bold')
                    };
                    if (booleanItalic) {
                        styleParams.push('italic')
                    };
                    if (booleanUnderlined) {
                        styleParams.push('underline-offset-8')
                    };
                    const style = styleParams.join(' ');
                    convertedToHTML.push(<span className={style}>{symbolsToStrings[b]}</span>)
            }
            b++;
        };
        console.log('convertedToHTML > ', convertedToHTML)
        if (convertedToHTML.length !== 0) {
            setContent(convertedToHTML)
        } else {
            setContent('test')
        }
        

        console.log('HTML')
    };

    const setCaret = () => {
        const num = document.querySelector(`#${stylesheet.editor}`).innerText.length;
        setCaretToPos(document.querySelector(`#${stylesheet.editor}`), 4);
    };
    // onKeyPress

    const test = () => {
        const abc = document.querySelector(`#${stylesheet.editor}`).innerHTML;
        const newABC = `<div class='blyat'>` + abc + `</div>`
        document.querySelector(`#${stylesheet.editor}`).innerHTML = newABC
    }

    return (
        <div>
            <div>
                <button >Cursor</button>
            </div>
            <div>
                <div onInput={test} id={stylesheet.editor} className={stylesheet.editor} contentEditable >{content}</div>
            </div>
        </div>

    )
};

export default ArticleEditor;