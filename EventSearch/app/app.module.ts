import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { SearchFormComponent } from './search-form/search-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material';
import { MatFormFieldModule} from '@angular/material/form-field';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule} from '@angular/common/http';
import { EventListComponent } from './event-list/event-list.component';
import { SubNamePipe } from './pipe/sub-name.pipe';
import { MatTooltipModule} from '@angular/material/tooltip';
import { DetailTabsComponent } from './detail-tabs/detail-tabs.component';
import {MatTabsModule} from '@angular/material/tabs';
import {RoundProgressModule} from 'angular-svg-round-progressbar';
import { NumberSplitPipe } from './pipe/number-split.pipe';
import { AgmCoreModule } from '@agm/core';
import { ParseFloatPipe } from './pipe/parse-float.pipe';
import { MatListModule} from '@angular/material/list';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule } from '@angular/forms';
import { ForBiddenDirective } from './for-bidden.directive';


@NgModule({
  declarations: [
    AppComponent,
    SearchFormComponent,
    EventListComponent,
    SubNamePipe,
    DetailTabsComponent,
    NumberSplitPipe,
    ParseFloatPipe,
    ForBiddenDirective,
  ],
  imports: [
    FormsModule,
    MatSelectModule,
    MatListModule,
    RoundProgressModule,
    MatTabsModule,
    MatTooltipModule,
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatAutocompleteModule,
    MatInputModule,
    MatFormFieldModule,
    BrowserAnimationsModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyDkZq-lmYBQETik-na6qBv1vM2nk9MJbXg' 
    })
  ],
  providers: [
   
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
