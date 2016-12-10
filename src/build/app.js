var cytoscape = require('cytoscape');
var $ = require('jQuery');

let cy = cytoscape({

container: $('#root'),

elements: [],

style: [
{
    selector: 'node',
    style: {
        'content': 'data(id)',
        'text-opacity': 0.7,
        'text-valign': 'center',
        'text-halign': 'center',
        'background-color': '#FE5E57'
    }
},

{
    selector: 'edge',
    style: {
        'width': 4,
        'target-arrow-shape': 'triangle',
        'line-color': '#9dbaea',
        'target-arrow-color': '#9dbaea',
        'curve-style': 'bezier'
    }
}
],
layout: {
    name: 'grid'
}
});

let myLayout = {
    name: 'grid',
    animate: true
}

let nodeCount = 0;
$(document).ready( function() {
    $('.AddNode').click( function() {
        cy.add({group: 'nodes',
                data: {id: nodeCount.toString()}});
        nodeCount++;
        cy.layout(myLayout);
    });
    $('.DeleteNode').click( function() {
        cy.$(':selected').remove();
    });
    $('.CreateEdge').click( function() {
        let from = $('#from').val();
        let to = $('#to').val();

        $('#from').val('');
        $('#to').val('');
        
        cy.add({group: 'edges',
            data:{id: 'edge_'+from+"_"+to, source: from, target: to}});
        cy.layout(myLayout);
    });
});

