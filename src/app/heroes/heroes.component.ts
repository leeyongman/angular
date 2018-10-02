import { Component, OnInit } from '@angular/core';
import { Hero } from '../hero';
import { HeroService } from '../hero.service';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css'],
  providers: [HeroService]
})
export class HeroesComponent implements OnInit {
  heroes: any = [];
  selectedHero: Hero;

  constructor(private heroService: HeroService) { }
  /*getHeroes(): void {
    this.heroService.getHeroes().then(heroes => this.heroes = heroes);
  }*/

  getHeroes() {
    return this.heroService.getHeroes().subscribe(heroes => {
      heroes.forEach((val) => {
        if (val.hasOwnProperty('id')) {
          this.heroes.push(val);
        }
      });
    });
  }

  ngOnInit(): void {
    this.getHeroes();
  }

  onSelect(hero: Hero): void {
    this.selectedHero = hero;
  }

  onDelete(hero: any): void {
    console.log(hero._id);
    alert(hero._id);
    this.heroes = this.heroes.filter(h => h !== hero);
    this.heroService.deleteHero(hero).subscribe(res => {
      console.log('** result **');
      if (res.status === 200) {
          console.log('** succ **');
      }
    });
  }

  onDataAdd(uid: number, uname: string): void {

    const newHero: Hero = {'id': uid, 'name': uname } as Hero;
    this.heroService.addHero(newHero)
      .subscribe(res => {

        if (res.status === 200) {
          this.heroes.push(res.body.result);
          this.heroes.sort(function(a, b) {
            return (parseInt(a.id, 10) > parseInt(b.id, 10)) ? 1 : (parseInt(a.id, 10) < parseInt(b.id, 10)) ? -1 : 0;
          });
        }
      });

  }
}
