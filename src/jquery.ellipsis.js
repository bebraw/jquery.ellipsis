(function($) {
    function ellipsis($elem, options) {
        var a = check('li', $elem, options);
        var b = check('dt', $elem, options);

        if (!(a || b)) {
            checkText($elem, options);
        }
    }

    function check(name, $elem, options) {
        var $elems = $(name, $elem);

        if ($elems.length > options.visible) {
            var $slice = $elem.children().slice($($elems[options.visible]).index()).hide();

            $more(name, options, function() {
                if (options.showCb) {
                    options.showCb($slice);
                } else {
                    $slice.show();
                }
            }).appendTo($elem);
        }

        if ($elems.length) {
            return true;
        }
    }

    function checkText($elem, options) {
        var input = $elem.html();
        var result = process({
            input: input,
            visible: options.visible,
            separator: options.separator,
            atFront: options.atFront
        });

        if(input !== result) {
            $elem.html(result);

            var $m = $more('span', options, function() {
                if (options.showCb) {
                    options.showCb($elem, input);
                } else {
                    $elem.html(input);
                }
            });

            if (options.atFront) {
                $m.prependTo($elem);
            }
            else {
                $m.appendTo($elem);
            }
        }
    }

    function $more(name, options, showCb) {
        var text = options.more;
        var moreClass = options.moreClass;

        var $m = $('<' + name + ' class="' + moreClass + '">' + text + '</' + name + '>');

        $m.bind('click', function() {
            showCb();
            $m.remove();
        });

        return $m;
    }

    function process(o) {
        o.segments = segmentize(o.input);

        return toHTML(ellipsify(o));
    }

    function segmentize(str) {
        var segments = [];
        var node = '';
        var text = '';
        var inTag = false;

        str.split('').forEach(function(char) {
            if (char === '<') {
                inTag = true;

                if (text) {
                    segments.push({
                        text: text,
                        node: ''
                    });

                    text = '';
                }
            }
            else if (char === '>') {
                inTag = false;

                if (node) {
                    segments.push({
                        text: '',
                        node: node
                    });

                    node = '';
                }
            }
            else if (inTag) {
                node += char;
            }
            else {
                text += char;
            }
        });

        if (text) {
            segments.push({
                text: text,
                node: ''
            });
        }

        return segments;
    }

    function ellipsify(o) {
        var segments = o.segments;
        var visible = o.visible;
        var separator = o.separator;
        var atFront = o.atFront;
        var str = segments.map(function(segment) {
            return segment.text;
        }).join('');
        var split = str.split(separator);

        if (split.length > visible) {
            if (atFront) {
                return mergeFromEnd(
                    segments,
                    split.slice(-visible).join(separator)
                );
            }

            return mergeFromStart(
                segments,
                split.slice(0, visible).join(separator)
            );
        }

        return segments;
    }

    function mergeFromEnd(segments, text) {
        var emptyText = false;
        var accum = 0;

        // XXX: mutates original array when reversing
        return segments.reverse().map(function(segment) {
            if (emptyText) {
                return;
            }

            var t = segment.text;
            var len = t.length;
            var fragment = text.slice(text.length - len - accum, text.length - accum);

            if (t === fragment) {
                accum += len;
            }

            if (fragment.length < len) {
                segment.text = fragment;
                emptyText = true;
            }

            return segment;
        }).filter(id).reverse();
    }

    function mergeFromStart(segments, text) {
        var emptyText = false;
        var accum = 0;

        return segments.map(function(segment) {
            if (emptyText) {
                return;
            }

            var t = segment.text;
            var len = t.length;
            var fragment = text.slice(accum, accum + len);

            if (t === fragment) {
                accum += len;
            }
            else if (fragment.length < len) {
                segment.text = fragment;
                emptyText = true;
            }

            return segment;
        }).filter(id);
    }

    function id(a) {return a;}

    function toHTML(segments) {
        var ret = '';

        segments.forEach(function(segment) {
            if (segment.node) {
                ret += '<' + segment.node + '>';
            }
            if (segment.text) {
                ret += segment.text;
            }
        });

        return ret;
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
        return this.each(function() {
            var $elem = $(this);
            var opts = $.extend({}, defaults, options);

            ellipsis($elem, opts);
        });
    };
    $.fn.ellipsis.options = defaults;
})(jQuery);