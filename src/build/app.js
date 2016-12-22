import $ from '../../bower_components/jquery/dist/jquery.js';
import Graph from '../build/graph.js';
 // import * as fs from 'fs-web'; через npm i fs-web -S

let _graph = new Graph('root', null);
let _graphType = "ON";

$(document).ready( function() {

    //Убираем див при запуске.
    $('.start-panel').show("slow", function () {
        console.log("done")
    });

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
        json = JSON.parse(JSON.stringify(json));
        var res = "";
        for (var i=0; i<json.elements.nodes.length; i++) {
            var node = json.elements.nodes[i];
            res += 'node '+node.data.id+'\n';
        }
        for (var i=0; i<json.elements.edges.length; i++) {
            var edges = json.elements.edges[i];
            res += 'edge '+edges.data.source+' '+edges.data.target+' '+edges.data.label+'\n';
        }
        let tab = window.open('about:blank');
        tab.document.write(res);
        tab.focus();
        
        // fs.writeFile('graph.txt', res, function (err) {
        // if (err) return console.log(err);
    });
    $('.BFS').click(function () {
        //node id
        console.log(_graph.BFS(1));
    });
    $('.ON').click(function () {
        $('.start-panel').hide("slow", function () {
            _graphType = "ON";
            console.log("done")
        });
    });
    $('.NN').click(function () {
        $('.start-panel').hide("slow", function () {
            _graphType = "NN";
            console.log("done")
        });
    });
    $('.ONN').click(function () {
        $('.start-panel').hide("slow", function () {
            _graphType = "ONN";
            console.log("done")
        });
    });
    $('.NNN').click(function () {
        $('.start-panel').hide("slow", function () {
            _graphType = "NNN";
            console.log("done")
        });
    });
    $('.Degree').click(function () {
        console.log(_graphType);
        if (_graphType in ['ON', 'ONN']) {
            _graph.CalcDegreeOfVertex();
        } else {
            _graph.CalcDegreeOfVertexNO();
        }
    });

    $('.Connectivity').click(function () {
        if (_graphType in ['ON', 'ONN']) {
            _graph.CalcDegreeOfVertex();
        } else {
            _graph.CalcDegreeOfVertexNO();
        }
        console.log(`Компонента связности графа: ${_graph.connectivity}`);
    });

    $('#file').change(function(){

        let file = this.files[0];

        let reader = new FileReader();
        reader.onload = function(progressEvent){

            var lines = this.result.split('\n');
            for(let i = 0; i < lines.length; i++){
                let str = lines[i].split(' ');
                if(str[0] == 'node') {
                    _graph.AddNode(str[1]);
                } else if(str[0] == 'edge') {
                    _graph.CreateEdge(str[1],str[2],str[3]);
                }
            }
        };
        reader.readAsText(file);
    });
});