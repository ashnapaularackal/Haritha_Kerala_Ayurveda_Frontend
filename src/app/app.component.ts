import { Component } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { Event } from '@angular/router';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
  
  export class AppComponent  {
    title = 'Haritha Kerala Ayurveda and Yoga Centre';
    currentRoute: string = '';
    chatbotOpen: boolean = false;
    constructor(private router: Router, private route: ActivatedRoute) {
      this.router.events.pipe(
        filter((event: Event): event is NavigationEnd => event instanceof NavigationEnd)
      ).subscribe((event: NavigationEnd) => {
        this.currentRoute = event.url;
      });
    }
  
scrollToSection(section: string) {
  const element = document.getElementById(section);
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' });
  }
}

toggleChatbot(): void {
  this.chatbotOpen = !this.chatbotOpen;
}

}
