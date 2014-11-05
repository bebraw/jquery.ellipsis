/*! jquery.ellipsis - v0.6.2 - Juho Vepsalainen - MIT
https://github.com/bebraw/jquery.ellipsis - 2014-11-05 */
(function ($) {
    function ellipsis($elem, options) {
        var a = check('li', $elem, options);
        var b = check('dt', $elem, options);

        if(!(a || b)) {
            checkText($elem, options);
        }
    }

    function check(name, $elem, options) {
        var $elems = $(name, $elem);

        if($elems.length > options.visible) {
            var $slice = $elem.children().slice($($elems[options.visible]).index()).hide();

            $more(name, options, function() {
                if(options.showCb) {
                    options.showCb($slice);
                }
                else {
                    $slice.show();
                }
            }).appendTo($elem);
        }

        if($elems.length) {
            return true;
        }
    }

    function checkText($elem, options) {
        var sep = options.separator;
        var origText = $elem.text();
        var split = origText.split(sep);

        if(split.length > options.visible) {
            var text;

            if(options.atFront) text = split.slice(-options.visible);
            else text = split.slice(0, options.visible);

            $elem.text(text.join(sep));

            var $m = $more('span', options, function() {
                if(options.showCb) {
                    options.showCb($elem, origText);
                }
                else {
                    $elem.text(origText);
                }
            });

            if(options.atFront) $m.prependTo($elem);
            else $m.appendTo($elem);

            return true;
        }
    }

    function $more(name, options, showCb) {
        var text = options.more;
        var moreClass = options.moreClass;

        var $m = $('<' + name + ' class="' + moreClass + '">' + text +'</' + name + '>');

        $m.bind('click', function() {
            showCb();
            $m.remove();
        });

        return $m;
    }

    var defaults = {
        visible: 3,
        more: '&hellip;',
        moreClass: 'more',
        separator: ' ',
        showCb: null,
        atFront: false
    };
    $.fn.ellipsis = function(options) {
        return this.each(function () {
            var $elem = $(this);
            var opts = $.extend({}, defaults, options);

            ellipsis($elem, opts);
        });
    };
    $.fn.ellipsis.options = defaults;
})(jQuery);
