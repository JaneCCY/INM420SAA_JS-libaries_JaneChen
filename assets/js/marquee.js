(function(win) {
    var isHTMLElement = (typeof HTMLElement === 'object') ? 
        function(obj) {
            return obj instanceof HTMLElement;
        } :
        function(obj) {
            return obj && typeof obj === 'object' && obj.nodeType === 1 && typeof obj.nodeName === 'string';
        };

    var marqueeJs = function(dom, options) {
        if (!isHTMLElement(dom)) return;

        var speed = options && options.speed || 100,
            inHtml = dom.innerHTML,
            inWidth = options && options.width || dom.offsetWidth,
            delay = options.delay ? options.delay : 0;
        
        var direction = options.direction || 'left';

        dom.setAttribute('style', 'position: relative; display:block; width:auto; white-space: nowrap;');
        
        var inHeight = options && options.height || dom.clientHeight,
            outWidth = dom.offsetWidth;
        
        if (outWidth >= inWidth) {
            dom.setAttribute('style', 'position: relative; display:inline-block; overflow:hidden; width:' + inWidth + 'px; height:' + inHeight + 'px;');

            // Create two span elements for seamless scrolling
            var leftItem = document.createElement('span'),
                rightItem = document.createElement('span');
            
            leftItem.setAttribute('style', 'position:absolute; top:0; left:0; white-space: nowrap;');
            rightItem.setAttribute('style', 'position:absolute; top:0; white-space: nowrap;');
            
            leftItem.innerHTML = inHtml;
            rightItem.innerHTML = inHtml;

            // Append elements to the DOM
            dom.innerHTML = '';
            dom.appendChild(leftItem);
            dom.appendChild(rightItem);

            // Position right item directly next to left item
            rightItem.style.left = leftItem.offsetWidth + 'px';

            // Marquee Movement Function
            function marqueeToDo() {
                if (direction === 'left') {
                    leftItem.style.left = (parseInt(leftItem.style.left) - 1) + 'px';
                    rightItem.style.left = (parseInt(rightItem.style.left) - 1) + 'px';
                } else if (direction === 'right') {
                    leftItem.style.left = (parseInt(leftItem.style.left) + 1) + 'px';
                    rightItem.style.left = (parseInt(rightItem.style.left) + 1) + 'px';
                }

                // Reset position for seamless loop
                if (parseInt(leftItem.style.left) <= -1 * leftItem.offsetWidth) {
                    leftItem.style.left = rightItem.offsetWidth + 'px';
                }
                if (parseInt(rightItem.style.left) <= -1 * rightItem.offsetWidth) {
                    rightItem.style.left = leftItem.offsetWidth + 'px';
                }
            }

            setTimeout(function() {
                setInterval(marqueeToDo, speed);
            }, delay);
        }
    };

    win.marqueeJs = marqueeJs;
})(window);
