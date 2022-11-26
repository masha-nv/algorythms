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
    isWeightAdded: boolean = false;
    isMousePressed: boolean = false;
    isAnimationComplete: boolean = false;
    steps!: number;
    selectedWeight!: number;

    constructor(){}
    
    ngOnInit(): void {
        this.initializeGrid(this.grid);
    }

    animateNodesVisitedInOrder() {
        this.isAnimationComplete = false;
        this.initializeGrid(this.grid);
        const nodes = dijkstra(this.grid, this.grid[START_ROW][START_COL], this.grid[END_ROW][END_COL]);
        for (let i = 0; i<nodes.length; i++) {
            setTimeout(() => {
                nodes[i].isVisitedClassAdded = true;
                if (i === nodes.length-1) this.animateShortestPath(this.grid[END_ROW][END_COL])
            }, i*10);
        }
    }

    animateShortestPath(endNode: Node) {
        this.isAnimationComplete = true;
        const nodes = getShortestPathNodes(endNode);
        this.steps = endNode.distance;
        for (let i = 0; i<nodes.length; i++) {
            setTimeout(() => {
                nodes[i].isVisitedClassAdded = false;
                nodes[i].isShortestPathClassAdded = true;
                console.log(nodes[i])
            }, i*50)
        }
    }

    initializeGrid(grid: Grid) {
        const gridNodes = []
        for (let i = 0 ; i<ROW_COUNT; i++) {
            const col: Node[] = []
            for (let j = 0; j<COL_COUNT; j++) {
                col.push({
                    row: i, col: j, 
                    isStart: (i === START_ROW && j === START_COL), 
                    isFinish: (i === END_ROW && j === END_COL),
                    isWall: grid ? grid[i][j].isWall : false,
                    isWeight: grid ? grid[i][j].isWeight : false,
                    distance: grid ? grid[i][j].distance : Infinity, 
                    isVisited: false,
                    isVisitedClassAdded: false, 
                    isShortestPathClassAdded: false, 
                    previous: null,
                    weight: grid ? grid[i][j].weight : 0
                })
            }
            gridNodes.push(col)
        }
        this.grid = gridNodes;
    }

    addWeight(weight: number) {
        this.isWeightAdded = true;
        this.selectedWeight = weight;
    }

    getNodeClasses(node: Node) {
        return node.isStart ? 'node-start' : 
        node.isFinish ? 'node-finish' : 
        node.isVisitedClassAdded ? 'node-visited': 
        node.isShortestPathClassAdded ? 'node-shorest-path': 
        node.isWeight ? 'node-weight' :
        node.isWall ? 'node-wall' :
        ''
    }

    
}