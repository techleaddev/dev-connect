import { CommonService } from './services/common.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  loading$ = this.loading.loading$;
  title = 'dev-connect';
  constructor(public loading: CommonService) {}
}
