import React, { useEffect, useState } from 'react';
import stylesheet from './index.module.css';

// max tag length - 102 symbols (<1-100>)

const ReactTE = (props) => {
    const [content, setContent] = useState();

    const handleText = () => {
        //  Метод getSelection() в момент ввода символа позволяет получить позицию курсора
        //  в конце установленного символа или вставленного текста.
        //  Логика данного алгоритма базируется на возможности забирать, обрабатывать и 
        //  обратно перезаписывать содержимое блока при помощи обращения к свойству объекта
        //  innerHTML. Поэтому необходимо вызвать метод getSelection() в самом начале
        //  выполняемого скрипта, когда у блока еще не произошло переприсвоение свойства
        //  innerHTML и браузер автоматически поставил курсор в привычную для любого 
        //  редактора текста позицию (в конце вставленного текста, в начало нового переноса
        //  строки, в конец предыдущей строки при удалении текущего переноса текста, 
        //  в конце добавленного символа, в начало позиции удаленного символа - эти пять
        //  пунктов я поначалу пытался решить алгоритмически через сравнение изменений в
        //  обновленного и предыдущего содержимых блока, но столкнулся с рядом тяжело 
        //  решаемых проблем: 1) вставка текста может копировать старую часть текста, и 
        //  при помощи алгоритмов нужно либо присваивать каждому введенному символу 
        //  уникальынй номер и сравнивать в итоге не символы, а их номера, либо отлавливать 
        //  позицию методом getSelection(), но тогда алгоритм сравнения версий текста
        //  совсем теряет смысл; 2) человек может вводить несколько одинаковых символов,
        //  что опять же не позволяет отловить конкретную позицию курсора у пользователя,
        //  алгоритм ставит курсор у череды одинаковых символов либо в начале при их удалении,
        //  либо в конце при их вводе, что опять же заставляет нас перехватывать позицию
        //  курсора методом getSeletction() или присваивать уникальные номера символам.
        let pos = window.getSelection().focusOffset;
        let div = window.getSelection().focusNode.parentNode.parentNode.childElementCount
        const selection = window.getSelection();

        //  Получаем html (тип - string).
        const object = document.querySelector(`#${stylesheet.editor}`);
        let html = object.innerHTML;

        //  Форматирование текста, а именно делаем так, чтобы весь текст
        //  состоял только из одного уровня DIV (абзацы), в которые в один
        //  уроверь вложены SPAN (части текста, разделенные по стилю).
        //  Никаких вложенных или отличных от div и span тегов быть больше
        //  не должно. 

        const recreacteInner = (node, inner) => {
            if (node.childElementCount === 0) {
                const text = node.innerText ? node.innerText : ' ';
                inner = inner.split(' ')[0] + text + inner.split(' ')[1];
                node.innerHTML = inner;
            };
        };

        const startHTML = `<div><span> </span></div>`;
        const innerDiv = `<span> </span>`;
        const innerSpan = ` `;
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
                            // case 'B':
                            //     const removedNodeB = object.childNodes[i].childNodes[j].childNodes[k];
                            //     const removedNodeBText = removedNodeB.innerText ? removedNodeB.innerText : ' ';
                            //     const recreatedNodeBText = document.createTextNode(removedNodeBText);
                            //     object.childNodes[i].childNodes[j].replaceChild(recreatedNodeBText, removedNodeB);
                            //     // object.childNodes[i].childNodes[j].className = 'font-bold';
                            //     break;
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

        return;
        const newRange = document.createRange();
        console.log('mmm')
        newRange.setStart(div, pos);
        console.log('aaa')
        newRange.collapse(true);
        console.log('bbb')
        selection.removeAllRanges();
        console.log('ccc')
        selection.addRange(newRange);
        console.log('eee')
        let divNum = 0;

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



        //  -----------------------------------------------------------
        const range = document.createRange();
        const sel = window.getSelection();
        range.setStart(object.childNodes[divNum].childNodes[0], pos);
        range.collapse(true);
        sel.removeAllRanges();
        sel.addRange(range);
    };

    return (
        <div>
            <div onInput={handleText} id={stylesheet.editor} className={stylesheet.editor} contentEditable >
                <div><span> </span></div>
            </div>
        </div>
    )
};

export default ReactTE;