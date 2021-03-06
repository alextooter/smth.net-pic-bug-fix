// ==UserScript==
// @name         fix jpg bug
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  修复水木看图bug
// @author       tiewuzi
// @match        http://www.newsmth.net/*
// @grant        none
// ==/UserScript==

(function () {
    'use strict';

    //版号
    let board = {
        NewExpress: 1348,
        Anti2019nCoV: 1110,
    }

    let targetNode = document.querySelector('#main');
    let config = {
        attributes: true,
        childList: true,
        subtree: true
    };

    function changeUrl(img) {
        var m = img.src.match(/http:\/\/www\.newsmth\.net\/nForum\/att\/(\w+)\/(\d+)\/(\d+)\/large/);
        if (m != null) {
            img.src = 'http://www.newsmth.net/att.php?n.' + board[m[1]] + '.' + m[2] + '.' + m[3] + '.jpg';
        }
    }

    const mutationCallback = (mutationsList) => {
        for (let mutation of mutationsList) {
            let target = mutation.target;
            if (target.id == "body" && mutation.addedNodes.length > 0) {
                var imgs = target.getElementsByTagName('img');
                for (let index = 0; index < imgs.length; index++) {
                    const img = imgs[index];
                    changeUrl(img);
                }
            }
        }
    };

    let observer = new MutationObserver(mutationCallback);
    observer.observe(targetNode, config);
    //observer.disconnect();

})();