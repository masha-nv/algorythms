import { MinHeap } from "./minHeap";

const WEIGHT = 3;

export interface Node {
    row: number,
    col: number,
    isStart: boolean,
    isFinish: boolean,
    isWall: boolean,
    isWeight: boolean,
    distance: number, 
    isVisited: boolean,
    isVisitedClassAdded: boolean,
    isShortestPathClassAdded: boolean,
    previous: Node,
}
export type Grid = [][] | any;



export function dijkstra(grid: Grid, startNode: Node, endNode: Node): Node[] {
    const nodes = getAllNodes(grid);
    startNode.distance = 0;
    // const nodes = getAllNodesInMinHeap(grid);
    const nodesVisitedInOrder: Node[] = [];

    while(nodes.length) {
        sortNodes(nodes)
        const closestNode = nodes.shift();
        if (closestNode?.distance === Infinity || closestNode === endNode || !closestNode) return nodesVisitedInOrder;
        if (closestNode?.isWall) continue;
        closestNode.isVisited = true;
        nodesVisitedInOrder.push(closestNode);
        updateNeighbors(closestNode, grid);
    }
    return nodesVisitedInOrder;
}

function sortNodes(nodes: Node[]) {
    return nodes.sort((nodeA, nodeB) => nodeA.distance - nodeB.distance)
}

function getAllNodes(grid: Grid) {
    const nodes = [];

    for (const row of grid) {
        for (const node of row) {
            nodes.push(node)
        }
    }
    return nodes;
}

function getAllNodesInMinHeap(grid: Grid) {
    const minHeap = new MinHeap();

    for (const row of grid) {
        for (const node of row) {
            minHeap.insert(node)
        }
    }

    return minHeap;

}

function updateNeighbors(closestNode: Node, grid: Grid) {
    const unvisitedNeighbors = getUnvisitedNeighbors(closestNode, grid);
    for (const neighbor of unvisitedNeighbors) {
        neighbor.distance = neighbor.isWeight ?  closestNode.distance + WEIGHT : closestNode.distance + 1;
        neighbor.previous = closestNode
    }
}

function getUnvisitedNeighbors(closestNode: Node, grid: Grid) {
    const { row, col } = closestNode;
    const neighbors = [];
    if (row > 0) neighbors.push(grid[row-1][col]);
    if (row < grid.length-1) neighbors.push(grid[row+1][col]);
    if (col > 0) neighbors.push(grid[row][col-1]);
    if (col < grid[0].length-1) neighbors.push(grid[row][col+1]);

    return neighbors.filter((n: Node) => !n.isVisited)
}

export function getShortestPathNodes (finishNode: Node) {
    const nodes: Node[] = [];

    let curr = finishNode;
    while (curr) {
        nodes.push(curr);
        curr = curr.previous;
    }

    return nodes;
}