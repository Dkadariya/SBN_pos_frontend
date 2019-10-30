import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { InventMgmtComponent } from './invent-mgmt/invent-mgmt.component';
import { Routes, RouterModule } from '@angular/router';

const appRoutes: Routes = [
  {path: 'inventory', component: InventMgmtComponent},
  {path: '', redirectTo: '/home', pathMatch: 'full'}
]
@NgModule({
  declarations: [
    AppComponent,
    InventMgmtComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
