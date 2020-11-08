import { Component, OnInit, Output, Renderer2, ViewChild } from '@angular/core';
import { CarouselComponent, Slide } from './components/carousel/carousel.component';
import { HttpClient } from '@angular/common/http';
import { AnimationType } from './components/carousel.anim';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  @ViewChild(CarouselComponent) carousel: CarouselComponent;
  title = 'kenomap-test';
  private _ListUrl = '/test/' ;
  @Output() slides: Slide[] = [
    // {
    //   headline: 'For Your Current Mood',
    //   src:
    //     'https://images.unsplash.com/photo-1567653418876-5bb0e566e1c2?ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80'
    // },
    // {
    //   headline: 'Miouw',
    //   src:
    //     'https://images.unsplash.com/photo-1559181567-c3190ca9959b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2000&q=80'
    // },
    // {
    //   headline: 'In The Wilderness',
    //   src:
    //     'https://images.unsplash.com/photo-1557800634-7bf3c7305596?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2001&q=80'
    // },
    // {
    //   headline: 'Focus On The Writing',
    //   src:
    //     'https://images.unsplash.com/photo-1551410224-699683e15636?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2000&q=80'
    // }
  ];

  animationType = AnimationType.Scale;

  animationTypes = [
    {
      name: 'Scale',
      value: AnimationType.Scale
    },
    {
      name: 'Fade',
      value: AnimationType.Fade
    },
    {
      name: 'Flip',
      value: AnimationType.Flip
    },
    {
      name: 'Jack In The Box',
      value: AnimationType.JackInTheBox
    }
  ];
  constructor(private httpClient: HttpClient, private render: Renderer2) {
  }

  ngOnInit(): void {
    // this.listImg = fakedata;

    this.httpClient.get<any[]>('/test/')
    .subscribe(res => {
      console.log('arret retour get', res);
      // this.getHeviestItem();
      this.slides = res;
    });
  }

  setAnimationType(type): void {
    this.animationType = type.value;
    setTimeout(() => {
      this.carousel.onNextClick();
    });
  }
}
