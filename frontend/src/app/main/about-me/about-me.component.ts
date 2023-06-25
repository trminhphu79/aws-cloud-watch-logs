import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'tmp-about-me',
  standalone: true,
  templateUrl: './about-me.component.html',
  styleUrls: ['./about-me.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AboutMeComponent {

}
