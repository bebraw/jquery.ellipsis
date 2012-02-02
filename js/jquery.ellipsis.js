/* MIT (c) Juho Vepsalainen */
(function ($) {
    function ellipsis($elem, options) {
        check('li', $elem, options);
        check('dt', $elem, options);
    }

    function check(name, $elem, options) {
        var $elems = $(name, $elem);

        if($elems.length > options.visible) {
            var $slice = $elem.children().slice($($elems[options.visible]).index()).hide();
            var $more = $('<' + name + ' class="more">' + options.more +'</' + name + '>').appendTo($elem);

            $more.bind('click', function() {
                $slice.show();
                $more.remove();
            });
        }
    }

    $.fn.ellipsis = function(options) {
        return this.each(function () {
            var $elem = $(this);
            var opts = $.extend({
                visible: 3,
                more: '...'
            }, options);

            ellipsis($elem, opts);
        });
    };
})(jQuery);
