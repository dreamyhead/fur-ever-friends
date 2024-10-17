import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { DogPageComponent } from './pages/dog-page/dog-page.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { DonateDialogComponent } from './shared/components/donate-dialog/donate-dialog.component';
import { AdoptDialogComponent } from './shared/components/adopt-dialog/adopt-dialog.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    DogPageComponent,
    NotFoundComponent,
    DonateDialogComponent,
    AdoptDialogComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
