import { Component, OnInit, Renderer2 } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MinibioService } from '../shared/services/minibio.service';
import { Minibio } from '../shared/models/minibio';

@Component({
  selector: 'app-minibio',
  templateUrl: './minibio.component.html',
  styleUrls: ['./minibio.component.scss']
})
export class MinibioComponent implements OnInit {

  isDarkMode = false

  isLoaded = false
  user = {
    image: "../assets/img/andrey_img.jpeg",
    username: "Andrey Marin",
    description: "Fullstack developer y entrenador de ellos 👨‍💻 🐼 visita todos mis links oficiales 🌎",
    links: [
      {
        link: "https://github.com/andreycattalin/",
        title: "Mis proyectos de github",
      },
      {
        link: "https://twitter.com/andreycattalin",
        title: "Cosas de twitter",
      },
      {
        link: "https://attomic.es",
        title: "La web de attomic",
      }
    ]
  }

  constructor(private renderer: Renderer2, private route: ActivatedRoute, private minibioService: MinibioService) {
    let userId = this.route.snapshot.paramMap.get('userid') ?? ""
    let bioId = this.route.snapshot.paramMap.get('id') ?? ""
    this.minibioService.getMiniBioPublic(userId, bioId).subscribe(data => {
      const minibio: Minibio = data.data() as Minibio
      minibio.id = data.id

      this.user.image = minibio.image
      this.user.username = minibio.title
      this.user.description = minibio.description

      this.user.links[0].title = minibio.linkTitle1
      this.user.links[0].link = minibio.linkUrl1

      this.user.links[1].title = minibio.linkTitle2
      this.user.links[1].link = minibio.linkUrl2

      this.user.links[2].title = minibio.linkTitle3
      this.user.links[2].link = minibio.linkUrl3

      this.isLoaded = true
    })
  }

  ngOnInit() {
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      // dark mode
      console.log("Dark mode ON")
    }
  }

  changeMode() {
    this.isDarkMode = !this.isDarkMode

    if(this.isDarkMode) {
      this.renderer.addClass(document.body, 'dark');
    } else {
      this.renderer.removeClass(document.body, 'dark');
    }
  }

}
