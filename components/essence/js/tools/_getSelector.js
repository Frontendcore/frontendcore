FrontendTools.getSelector = function ( element  ) {

    function replaceAll( term, search, replacement) {

        if ( term !== undefined) {
            return term.split(search).join(replacement);
        } else {
            return "";
        }

    };

    if (element.id !=='' ) {
        return '__'+ replaceAll(element.id, '-','_') +'';

    }
    if (element===document.body) {
        return element.tagName;
    }


    var ix= 0;

    if ( element.parentNode) {
        var siblings = element.parentNode.childNodes;
        for (var i= 0; i<siblings.length; i++) {
            var sibling = siblings[i];
            if (sibling===element)
                return FrontendTools.getSelector(element.parentNode)+'_'+element.tagName+'__'+(ix+1)+'__';
            if (sibling.nodeType===1 && sibling.tagName===element.tagName)
                ix++;
        }
    }

};