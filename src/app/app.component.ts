import { CommonService } from './services/common.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'dev-connect';
  loading$ = this.loading.loading$;
  constructor(public loading: CommonService) {}
}
