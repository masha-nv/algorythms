import { Directive, HostBinding, HostListener, Input } from '@angular/core';
import { Node } from 'src/algorythms/dijkstra';

@Directive({
  selector: '[appNode]'
})
export class NodeDirective {

  @Input('appNode')
  node!: Node

  @Input('isWeightAdded')
  isWeightAdded!: boolean;

  @Input('selectedWeight')
  selectedWeight!: number;

  constructor() {
   }

   @HostListener('mousedown')
   onMouseDown() {
    if (this.isWeightAdded) {
      this.node.isWeight = !this.node.isWeight;
      this.node.weight = this.selectedWeight;
    } else {
      this.node.isWall = !this.node.isWall;
      if (this.node.isWall && this.node.isVisitedClassAdded) {
        this.node.isVisitedClassAdded = false;
      }
    }
   }

}
