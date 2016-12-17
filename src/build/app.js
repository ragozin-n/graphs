import $ from 'jQuery';
import Graph from '../app/graph.js';
let _graph = new Graph('root', null);

$(document).ready( function() {
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

        _graph.CreateEdge(from, to);
    });
    $('.Export').click(function () {
        let json = _graph.ExportAsJson();
        console.log(json);
        let tab = window.open('about:blank');
        tab.document.write(JSON.stringify(json));
        tab.focus();
    })
});

