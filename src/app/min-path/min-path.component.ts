import { Component, OnInit } from "@angular/core";
import { dijkstra, getShortestPathNodes, Grid, Node } from "src/algorythms/dijkstra";


const ROW_COUNT = 50, COL_COUNT = 50, START_ROW = 10, START_COL = 10, END_ROW = 15, END_COL = 15;

@Component({
    selector: 'app-min-path',
    templateUrl: './min-path.component.html',
    styleUrls: ['./min-path.component.scss']
})
export class MinPathComponent implements OnInit {
    grid!: Grid;
    constructor(){}
    
    ngOnInit(): void {
        this.initializeGrid();
        const nodesVisitedInOrder = dijkstra(this.grid, this.grid[START_ROW][START_COL], this.grid[END_ROW][END_COL]);
        this.animateNodesVisitedInOrder(nodesVisitedInOrder)
    }

    animateNodesVisitedInOrder(nodes: Node[]) {
        for (let i = 0; i<nodes.length; i++) {
            console.log(nodes[i] === this.grid[END_ROW][END_COL])
            setTimeout(() => {
                if (nodes[i] === this.grid[END_ROW][END_COL]) {
                    this.animateShortestPath(this.grid[END_ROW][END_COL]);
                    return;
                } else {
                    nodes[i].isVisitedClassAdded = true;
                } 
            }, i*10)
        }
    }

    animateShortestPath(endNode: Node) {
        const nodes = getShortestPathNodes(endNode);
        console.log('shortest path', nodes)
        for (let i = 0; i<nodes.length; i++) {
            setTimeout(() => {
                nodes[i].isVisitedClassAdded = false;
                nodes[i].isShortestPathClassAdded = true;
                console.log(nodes[i])
            }, i*50)
        }
    }

    initializeGrid() {
        const gridNodes = []
        for (let i = 0 ; i<ROW_COUNT; i++) {
            const col = []
            for (let j = 0; j<COL_COUNT; j++) {
                col.push({
                    row: i, col: j, 
                    isStart: (i === START_ROW && j === START_COL), 
                    isFinish: (i === END_ROW && j === END_COL),
                    isWall: false,
                    isWeight: false,
                    distance: Infinity, 
                    isVisited: false
                })
            }
            
            gridNodes.push(col)
        }
        this.grid = gridNodes;
    }

    getNodeClasses(node: Node) {
        return node.isStart ? 'node-start' : 
        node.isFinish ? 'node-finish' : 
        node.isVisitedClassAdded ? 'node-visited': 
        node.isShortestPathClassAdded ? 'node-shorest-path': 
        ''
    }
}