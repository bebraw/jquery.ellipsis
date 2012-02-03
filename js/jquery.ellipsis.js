/* MIT (c) Juho Vepsalainen */
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

            $more(name, options.more, function() {
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
        var origText = $elem.text();
        var split = origText.split(' ');

        if(split.length > options.visible) {
            var text = split.slice(0, options.visible).join(' ');
            $elem.text(text);

            $more('span', options.more, function() {
                if(options.showCb) {
                    options.showCb($elem, origText);
                }
                else {
                    $elem.text(origText);
                }
            }).appendTo($elem);

            return true;
        }
    }

    function $more(name, text, showCb) {
        var $m = $('<' + name + ' class="more">' + text +'</' + name + '>');

        $m.bind('click', function() {
            showCb();
            $m.remove();
        });

        return $m;
    }

    var defaults = {
        visible: 3,
        more: '...',
        showCb: null
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
