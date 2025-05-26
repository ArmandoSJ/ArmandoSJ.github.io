import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TitleService } from '@core/services/title.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html'
})
export class AppComponent {
  private titleService = inject(TitleService);

  ngOnInit(): void {
    this.titleService.init()
  }
}
