let cytoscape = require('cytoscape');

class Graph {
	constructor(root_element_id, styles, layout) {
        this.nodeCount = 0;
        this.layout = {
            name: 'grid',
            animate: true
        };
        //styles позволяет задавать тип графа
        //layout позволяет задавать расположение графа на странице
        if (!styles || !layout) {
            this.graph = cytoscape({
                container: document.querySelector('#' + root_element_id),
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
        }
    }

	AddNode() {
        this.graph.add({
            group: 'nodes',
            data: {id: this.nodeCount.toString()}
        });
        this.nodeCount++;
        this.graph.layout(this.layout);
    }

	RemoveNode() {
		this.graph.remove(':selected');
	}

	CreateEdge(from, to) {
        this.graph.add({
            group: 'edges',
            data: {id: 'edge_' + from + "_" + to, source: from, target: to}
        });
        this.graph.layout(this.layout);
    }

    ExportAsJson() {
		return this.graph.json();
	}

	ImportGraphJson(json) {
		this.graph.json(json);
		this.graph.layout(this.layout);
	}


}

module.exports = Graph;