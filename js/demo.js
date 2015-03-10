$(function() {
    $('#interactive').qdemo({
        pluginName: 'ellipsis',
        parentElement: '<p>john <b>eliza mike</b><br/> roger<br/><br/></p>'
    });
    $('#bulletedList').ellipsis({
        moreClass: 'another-more'
    });
    $('#orderedList').ellipsis({visible: 2, more: 'more'});
    $('#definitionList').ellipsis({showCb: function($e) {
        $e.fadeIn(500);
    }});
    $('#paragraph').ellipsis({visible: 10});
    $('#animatedParagraph').ellipsis({visible: 10, showCb: function($e, t) {
        $e.hide().text(t).slideDown('slow');
    }});
    $('#chars').ellipsis({atFront: true, separator: '', visible: 10});
});
