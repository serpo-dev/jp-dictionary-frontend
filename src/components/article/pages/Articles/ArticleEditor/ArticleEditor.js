import React, { useEffect } from 'react';
import { useState } from 'react';
import stylesheet from './ArticleEditor.module.css';

// max tag length - 102 symbols (<1-100>)

const ArticleEditor = (props) => {
    const [content, setContent] = useState();

    console.log('LOADING')

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
        console.log(document.querySelector(`#${stylesheet.editor}`))
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
                    convertedToHTML.push(<br />)
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

    const test = () => {
        console.log(window.getSelection())

        //  Получаем html (тип - string).
        const object = document.querySelector(`#${stylesheet.editor}`);
        const html = object.innerHTML;
        console.log(html)
        console.log(content)
        console.log(html.length)

        //  Делаем так, чтобы при полном форматировании блока (Ctrl + A + Del)
        //  сам блок визуально не удалялся (он удаляется, если пропадает 
        //  деление текста на div или между <div></div> нет пробела).
        if (html === '<div></div>') {
            document.querySelector(`#${stylesheet.editor}`).innerHTML = '<div> </div>';
            return;
        } else if (html === '<br>') {
            document.querySelector(`#${stylesheet.editor}`).innerHTML = '<div> </div>';
            return;
        } else if (html === '<div></div><div><br></div>') {
            document.querySelector(`#${stylesheet.editor}`).innerHTML = '<div> </div>';
            return;
        } else if (html.length === 0) {
            document.querySelector(`#${stylesheet.editor}`).innerHTML = '<div> </div>';
            return;
        };

        //  Побочный эффект предыдущего обработчика - это пробел перед
        //  первым введенным символом. Его нужно удалить, если блок 
        //  содержит > 1 символов (первый символ - это сам пробел).
        if (html.length >= 13 && html[5] === ' ') {
            let remain = html.split('');
            const removed = remain.splice(5, 1);
            remain = remain.join('');
            document.querySelector(`#${stylesheet.editor}`).innerHTML = remain;
            return;
        };

        //  Присваиваем обработанный html (все тот же тип string) 
        //  содержимому блока.
        document.querySelector(`#${stylesheet.editor}`).innerHTML = html;

        //  Заносим html в localState.
        setContent(html);

        //  Сравниваем длины предыдущего и текущего состояний,
        //  пользуясь особенностью, что content !== html, т.к.
        //  эта функция выполняется до перерендерв компоненты и
        //  использует необновленный локальный state. 
        let isCurrentLonger;
        if (content.length < html.length) {
            isCurrentLonger = false;
        } else if (content.length > html.length) {
            isCurrentLonger = true;
        } else {
            console.log('CONTENT и HTML имеют одинаковые длины');
            return;
        };

        //  Определяем номер символа, с которого строки начинают 
        //  отличаться друг от друга.
        let mismatch = 0;
        while (mismatch < html.length) {
            const isMismatch = html[mismatch] !== content[mismatch];
            if (isMismatch) {
                break;
            };
            mismatch++;
        };
       

        //  Поскольку строка разбита на части, упакованные в div,
        //  то до конкретного символа достучаться не так просто.
        //  Для того, чтобы указать место постановки курсора, необходимо
        //  знать номер блока div и позицию символа в нем. 
        //  Проще всего в таком случае создать массив, в который внести
        //  как элементы части текста, разделенные тегами div.
        //  Метод slice(1) необходимо применить, так как при использовании
        //  другого метода разделения split('<div>') в начале массива 
        //  появляется пустая строка '', которая не несет никакой 
        //  информационной ценности.
        //  Переменная divNum будет отражать номер div блока, в котором
        //  содержится искомый символ. Номер самого символа (переменная pos)
        //  найдем через разность. 
        //  При увеличении значения суммы добавляем + 5, потому что
        //  все <div> были вырезаны методом split(), их длину нужно учесть.
        const noStartDiv = html.split('<div>');
        const noDiv = noStartDiv.slice(1);
        let divNum = 0;
        let sum = 0;
        for (let i = 0; i < noDiv.length; i++) {
            sum = sum + noDiv[i].length + 5;
            if (sum > mismatch) {
                break;
            };
            divNum++;
        };
        const div = noDiv[divNum];
        const pos = div.length - (sum - mismatch);

        //  Непосредственно установка положения курсора в нужное место.
        //  Булева переменная isCollapseStart настраивает метод 
        //  Rande.collapse(), у которого значение true отвечает за инсерт
        //  в начало символа, а false - в конец. Таким образом, если
        //  пользователь увеличил строку, то необходимо установить
        //  курсор в положение после символа.
        const isCollapseStart = !isCurrentLonger;
        const range = document.createRange();
        const sel = window.getSelection();
        range.setStart(object.childNodes[divNum].childNodes[0], pos);
        range.collapse(isCollapseStart);
        sel.removeAllRanges();
        sel.addRange(range);
    };

    const select = () => {
        const ooo = window.getSelection().anchorNode.parentNode.innerHTML
        console.log(window.getSelection())
    }

    return (
        <div>
            <div>
                <button onClick={select}>Cursor</button>
            </div>
            <div>
                <div onInput={test} id={stylesheet.editor} className={stylesheet.editor} contentEditable ><div> </div></div>
            </div>
        </div>

    )
};

export default ArticleEditor;