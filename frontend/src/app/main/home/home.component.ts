import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ExperienceComponent } from '../experience/experience.component';
import { AboutMeComponent } from '../about-me/about-me.component';

@Component({
  selector: 'tmp-home',
  standalone: true,
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    ExperienceComponent,
    AboutMeComponent
  ],
})
export class HomeComponent {

}
