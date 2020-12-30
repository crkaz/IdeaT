import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoreModule } from '../../core/core.module';
import { BusinessCanvasPanelComponent } from './business-canvas-panel/business-canvas-panel.component';
import { BusinessCanvasBoardComponent } from './business-canvas-board/business-canvas-board.component';

@NgModule({
  declarations: [BusinessCanvasPanelComponent, BusinessCanvasBoardComponent],
  imports: [CommonModule, CoreModule],
  exports: [BusinessCanvasPanelComponent]
})
export class BusinessCanvasModule {}
