import cytoscape from 'cytoscape';

export default class Graph {
	constructor(root_element_id, styles) {
        this.nodeCount = 1;
        this.layout = {
            name: 'grid',
            animate: true
        };
        this.connectivity = 1;
        this.lastClickedId = 0;
        //styles позволяет задавать тип графа
        //layout позволяет задавать расположение графа на странице
        if (!styles) {
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
                            // 'width': 3,
                            // 'line-color': '#ad1a66'
                            'width': 4,
                            'target-arrow-shape': 'triangle',
                            'line-color': '#9dbaea',
                            'target-arrow-color': '#9dbaea',
                            'curve-style': 'bezier',
                            'label': 'data(label)',
                            'text-outline-color': '#ccc',
                            'text-outline-width': 3
                        }
                    },
                    {
                      selector: '.autorotate',
                      style: {
                        'edge-text-rotation': 'autorotate'
                      }
                    }
                ],
                layout: {
                    name: 'grid'
                }
            });
        } else {
            this.graph = cytoscape({
                container: document.querySelector('#' + root_element_id),
                elements: [],
                style: styles,
                layout: {
                    name: 'grid'
                }
            });
        }
        var debug_info = function (event) {
            //console.log("clicked on " + event.cyTarget.data("id"));
            this.lastClickedId = event.cyTarget.data("id");
            //console.log("last clicked: " + this.lastClickedId);
        };
        //добавил для дебага
        this.graph.on('click', debug_info.bind(this));
    }

	AddNode(name) {
        if(!name) {
            this.graph.add({
                group: 'nodes',
                data: {id: this.nodeCount.toString()}
            });
            this.nodeCount++;
            this.graph.layout(this.layout);
        } else {
            this.graph.add({
                group: 'nodes',
                data: {id: name.toString()}
            });
            this.nodeCount++;
            this.graph.layout(this.layout);
        }
    }

	RemoveNode() {

		this.graph.remove(':selected');
	}

	CreateEdge(from, to, value) {
        if(!isNaN(parseFloat(value)) && isFinite(value)) {
            this.graph.add({
                group: 'edges',
                data: {id: 'edge_' + from + "_" + to, source: from, target: to, label: value},
                classes: 'autorotate'
            });
        } else {
            this.graph.add({
                group: 'edges',
                data: {id: 'edge_' + from + "_" + to, source: from, target: to},
                classes: 'autorotate'
            });
        }
        this.graph.layout(this.layout);
    }

    ExportAsJson() {
		return this.graph.json();
	}

	ImportGraph(filename) {
		// this.graph.json(json);
        this.graph.json(json);
		this.graph.layout(this.layout);
	}

    CalcDegreeOfVertex() {
	    this.connectivity = 0;
	    for(let i = 0; i < this.graph.nodes().length;i++) {
	        console.log(`Вершина ${this.graph.nodes()[i].data("id")} степень: ${this.graph.edges(`[source=\'${this.graph.nodes()[i].data("id")}\']`).length}`);

	        //Связность
	        if(this.graph.edges(`[source=\'${this.graph.nodes()[i].data("id")}\']`).length == 0) {
	            this.connectivity ++;
            }
        }
    }
    //non-oriented
    CalcDegreeOfVertexNO() {
        this.connectivity = 0;
        for(let i = 0; i < this.graph.nodes().length;i++) {
            let currentDegree = 0;
            console.log(this.graph.edges(`[source=\'${this.graph.nodes()[i].data("id")}\']`).length,this.graph.edges(`[target=\'${this.graph.nodes()[i].data("id")}\']`).length);
            currentDegree = this.graph.edges(`[source=\'${this.graph.nodes()[i].data("id")}\']`).length +
                            this.graph.edges(`[target=\'${this.graph.nodes()[i].data("id")}\']`).length;
            console.log(`Вершина ${this.graph.nodes()[i].data("id")} степень: ${currentDegree}`);

            //Связность
            if(this.graph.edges(`[source=\'${this.graph.nodes()[i].data("id")}\']`).length == 0 || this.graph.edges(`[target=\'${this.graph.nodes()[i].data("id")}\']`).length == 0) {
                this.connectivity ++;
            }
        }
    }

    BFS(id) {
	    //Можно использовать параметры. Подробнее: http://js.cytoscape.org/#eles.breadthFirstSearch
	    let result = this.graph.elements().bfs(`#${id}`);
	    return result.path;
    }

    GetMin() {
        for(let i = 0; i < this.graph.nodes().length;i++) {
            if(this.graph.nodes()[i].data("id") == this.lastClickedId) {
                let curCol = this.graph.edges(`[source=\'${this.graph.nodes()[i].data("id")}\']`);
                let minimum = 999;
                for (let j = 0; j < curCol.length; j++) {
                    if(parseInt(curCol[j].data("label")) < minimum) {
                        minimum = parseInt(curCol[j].data("label"));
                    }
                }
                console.log(`Минимальное ребро имеет вес: ${minimum}`);
            }
        }
    }

}