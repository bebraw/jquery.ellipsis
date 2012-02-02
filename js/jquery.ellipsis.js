/* MIT (c) Juho Vepsalainen */
(function ($) {
    function ellipsis($elem, options) {
        var $lis = $('li', $elem);

        if($lis.length > options.visible) {
            var $slice = $lis.slice(options.visible).hide();
            var $more = $('<li class="more">' + options.more +'</li>').appendTo($elem);

            $more.bind('click', function() {
                $slice.show();
                $more.hide();
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
