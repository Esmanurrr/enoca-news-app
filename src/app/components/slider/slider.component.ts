import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faArrowRight } from  '@fortawesome/free-solid-svg-icons';
import { faArrowLeft } from  '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-slider',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule],
  templateUrl: './slider.component.html',
  styleUrl: './slider.component.scss'
})
export class SliderComponent {
  @Input() slides: any[] = [];
  currentSlide = 0;
  faArrowRight = faArrowRight;
  faArrowLeft = faArrowLeft;

  goToLink(url: string): void {
    window.open(url, '_blank');
    console.log(url);
  }

  stopClick(event: MouseEvent): void {
    event.stopPropagation(); 
  }

  next(){
    this.currentSlide = (this.currentSlide + 1) % this.slides.length;
  }

  prev(){
    this.currentSlide = (this.currentSlide - 1 + this.slides.length) % this.slides.length;
  }

  jumpToSlide(index: number){
    this.currentSlide = index;
  }
}
