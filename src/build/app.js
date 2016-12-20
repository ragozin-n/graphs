import $ from '../../bower_components/jquery/dist/jquery.js';
import Graph from '../build/graph.js';
let _graph = new Graph('root', null);

$(document).ready( function() {

    //Убираем див при запуске.
    $('.start-panel').hide("slow", function(){console.log("done")});

    $('.start-panel').show("slow", function(){console.log("done")});

    $('.AddNode').click(function () {
        _graph.AddNode(null);
    });
    $('.DeleteNode').click(function () {
        _graph.RemoveNode();
    });
    $('.CreateEdge').click(function () {
        let from = $('#from').val();
        let to = $('#to').val();

        $('#from').val('');
        $('#to').val('');

        _graph.CreateEdge(from, to, 0);
    });
    $('.Export').click(function () {
        let json = _graph.ExportAsJson();
        console.log(json);
        let tab = window.open('about:blank');
        tab.document.write(JSON.stringify(json));
        tab.focus();
    })
    $('ul.tabs').tabs();
    $('ul.tabs').tabs('select_tab', 'tab_id');
});

