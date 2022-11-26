import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MinPathComponent } from './min-path/min-path.component';
import { NodeDirective } from './directives/node.directive';

@NgModule({
  declarations: [
    AppComponent,
    MinPathComponent,
    NodeDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
