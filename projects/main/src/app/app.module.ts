import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { CoreModule } from '../app/core/core.module';
import { IdeaModule } from '../app/modules/idea/idea.module';
import { BusinessCanvasModule } from '../app/modules/business-canvas/business-canvas.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CoreModule,
    IdeaModule,
    BusinessCanvasModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
