import {Component} from '@angular/core';
import {ProductMainContainerComponent} from './components/product-main-container/product-main-container.component';

@Component({
  selector: 'app-root',
  imports: [ProductMainContainerComponent],
  templateUrl: './app.component.html',
  standalone: true,
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'product-inventory';
}
