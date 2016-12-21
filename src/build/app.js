import $ from '../../bower_components/jquery/dist/jquery.js';
import Graph from '../build/graph.js';

let _graph = new Graph('root', null);

$(document).ready( function() {

    //Убираем див при запуске.
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
        let value = $('#value').val();

        $('#from').val('');
        $('#to').val('');
        $('#value').val('');

        _graph.CreateEdge(from, to, value);
    });
    $('.Export').click(function () {
        let json = _graph.ExportAsJson();
        console.log(json);
        let tab = window.open('about:blank');
        tab.document.write(JSON.stringify(json));
        tab.focus();
    });
    $('.BFS').click(function () {
        console.log(_graph.BFS(1));
    });
    $('.ON').click(function () {
        $('.start-panel').hide("slow", function(){console.log("done")});

    });
    $('.NN').click(function () {
        $('.start-panel').hide("slow", function(){console.log("done")});
    });
    $('.ONN').click(function () {
        $('.start-panel').hide("slow", function(){console.log("done")});
    });
    $('.NNN').click(function () {
        $('.start-panel').hide("slow", function(){console.log("done")});
    });
    $('.Degree').click(function () {
        _graph.CalcDegreeOfVertex();
    });
    $('.Connectivity').click(function () {
        _graph.CalcDegreeOfVertex();
        console.log(`Компонента связности графа: ${_graph.connectivity}`);
    });
});

