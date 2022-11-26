import { Component } from "@angular/core";
import { Node } from "./dijkstra";

export class MinHeap {
    [x: string]: Node[] | any;
    constructor() {
        this['vals'] = []
    }

    insert(node:Node ):void {
        this['vals'].push(node);
        let chIdx = this['vals'].length-1;

        while (true) {
            let pIdx = Math.floor((chIdx-1)/2);

            if (pIdx >= 0 && this['vals'][pIdx].distance > this['vals'][chIdx].distance) {
                this.swap(pIdx, chIdx);
                chIdx = pIdx;
            } else break;
        }
    }

    extractMin() {
        this.swap(0, this['vals'].length-1);
        const minNode = this['vals'].pop(), n = this['vals'].length;

        let pIdx = 0;

        while (true) {
            let lIdx = pIdx*2+1, rIdx = pIdx*2+2, swapIdx = null;

            if(lIdx < n && this['vals'][lIdx].distance < this['vals'][pIdx].distance) {
                swapIdx = lIdx;
            }
            if (rIdx < n && this['vals'][rIdx].distance < this['vals'][pIdx].distance && this['vals'][rIdx].distance < this['vals'][lIdx].distance) {
                swapIdx = rIdx;
            }
            if (swapIdx === null) break;
            this.swap(pIdx, swapIdx);
            pIdx = swapIdx;
        }

        return minNode;
    }

    swap(i: number, j: number) {
        return [this['vals'][i], this['vals'][j]]
    }
}