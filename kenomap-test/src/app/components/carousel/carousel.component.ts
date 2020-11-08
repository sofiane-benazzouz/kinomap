import { transition, trigger, useAnimation } from '@angular/animations';
import { Component, Input, OnInit } from '@angular/core';
import { AnimationType, fadeIn, fadeOut, flipIn, flipOut, jackIn, jackOut, scaleIn, scaleOut } from '../carousel.anim';
export interface Slide {
    headline?: string;
    image: string;
    name: string;
    weight: number;
}

@Component({
  selector: 'carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss'],
  animations: [
    trigger('slideAnimation', [
      /* scale */
      transition('void => scale', [
        useAnimation(scaleIn, { params: { time: '500ms' } })
      ]),
      transition('scale => void', [
        useAnimation(scaleOut, { params: { time: '500ms' } })
      ]),

      /* fade */
      transition('void => fade', [
        useAnimation(fadeIn, { params: { time: '500ms' } })
      ]),
      transition('fade => void', [
        useAnimation(fadeOut, { params: { time: '500ms' } })
      ]),

      /* flip */
      transition('void => flip', [
        useAnimation(flipIn, { params: { time: '500ms' } })
      ]),
      transition('flip => void', [
        useAnimation(flipOut, { params: { time: '500ms' } })
      ]),

      /* JackInTheBox */
      transition('void => jackInTheBox', [
        useAnimation(jackIn, { params: { time: '700ms' } })
      ]),
      transition('jackInTheBox => void', [
        useAnimation(jackOut, { params: { time: '700ms' } })
      ])
    ])
  ]
})
export class CarouselComponent implements OnInit {
  public _slides: Slide[];
  @Input() set slides(value: Slide[]) {
    this._slides = value;
    this.sortedList = value.map((x) => {
      return { ...x };
   });
  }
  get slides(): Slide[] {
    return this._slides;
  }
  @Input() animationType = AnimationType.Scale;

  currentSlide = 0;
  currentSortedIndex = 0;
  nextSlide = 1;
  prevSlide = 2;
  // tslint:disable-next-line: variable-name
  public _sortedList: any[] = [];
  public set sortedList(value: any[]) {
    this._sortedList = value;
  }

  constructor() {}


  highestWeight(): void {
    const currentSorted = this._sortedList.find(em => em.name === this.slides[this.currentSlide].name);
    this.sortedList = this._sortedList.sort((a, b) => this.compareFn(a, b)).filter(item => item.name !== currentSorted.name);
    this._sortedList.push(currentSorted);
  }

  // Function to compare two objects by comparing their `unwrappedName` property.
  compareFn(a, b): number {
    if (a.weight > b.weight) {
      return -1;
    }
    if (a.weight < b.weight) {
      return 1;
    }
    return 0;
  }

  onNextClick(): void {
    this.highestWeight();
    const next = this.getnext();
    this.prevSlide = this.currentSlide;
    this.currentSlide = next === this.slides.length ? 0 : next;
    this.currentSortedIndex = this._sortedList.findIndex(em => em.name === this.slides[next].name);
    this.updateWeights();
  }

  onPreviousClick(): void {
    const previous = this.prevSlide;
    this.currentSlide = previous < 0 ? this.slides.length - 1 : previous;
    this.prevSlide = this.getnext();
  }

  getnext(): number {
    const max = this.slides.length;
    let item = this._sortedList[Math.floor(Math.random() * max)];
    let i = 0;
    while (item.weight === 0 || item.name === this.slides[this.currentSlide].name) {
      i = Math.floor(Math.random() * max);
      item = this.slides[i];
      if (i === this.slides.length - 1) {
        return this.slides.findIndex(e => this._sortedList[0].name === e.name);
      }
    }
    return this.slides.findIndex(em => em.name === item.name);
  }

  updateWeights(): void {
    this.sortedList = this._sortedList.map((item, index) => {
      if (item.weight > 0 && this.currentSortedIndex === index) {
        item.weight -= 1;
      }
      return item;
    });
    const comparer = (currentValueC) => currentValueC.weight === 0;
    if (this._sortedList.every(comparer)){
      this.sortedList = this.slides.map((x) => {
        return { ...x };
     });
    }
  }

  ngOnInit(): void {
    this.preloadImages(); // for the demo
  }

  preloadImages(): void {
    for (const slide of this.slides) {
      new Image().src = slide.image;
    }
  }

}
