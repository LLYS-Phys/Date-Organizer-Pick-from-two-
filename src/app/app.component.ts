import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'pick_from_two';

  selectedCards : string[] = []

  ideas = [
    "Go to the Cinema",
    "Netflix & Chill",
    "Go to a Bar",
    "Board Games Night",
    "Video Games Night",
    "Go to a Restaurant",
    "Cook Together",
    "Go on a Picknick",
    "Take a trip",
    "Play Music",
    "Explore the City",
    "Dance Together",
    "Visit the Zoo/Museum/Gallery",
    "Go out for Dessert",
    "Karaoke Night",
    "Arts & Craft Time",
    "Go for a Coffee",
    "Go play Billiards/Bowling/etc.",
    "Karting/Zone52/etc.",
    "No Tech Evening",
    "Go to a Standup Comedy Show",
    "Go to the Dog Shelter",
    "Rock-Paper-Scissors Date",
  ]

  screen = 1
  custom : string[] = []

  chosenCard : string[] = []
  showNotSelected: boolean = false

  selectCard(idea: string){
    if (this.selectedCards.includes(idea)){
      let index = this.selectedCards.indexOf(idea)
      this.selectedCards.splice(index, 1)
    }
    else{
      if (this.selectedCards.length>=2){
        this.selectedCards.splice(-1)
        this.selectedCards.push(idea)
      }
      else{
        this.selectedCards.push(idea)
      }
    }
  }

  coloring(){
    let cards = document.getElementsByClassName('card')

    for (let i=0; i<this.ideas.length; i++){
      let item = cards[i].textContent?.toString()!

      if (this.selectedCards.includes(item)){
        cards[i].classList.add('green')
      }
      else{
        cards[i].classList.remove('green')
      }
    }

    let textareas = document.getElementsByTagName('textarea')
    let textarea1 = textareas[0].value
    let textarea2 = textareas[1].value
    let textareasContainer = document.getElementsByClassName('custom-idea')

    if (this.selectedCards.includes(textarea1)){
      textareasContainer[0].classList.add('green')
    }
    else{
      textareasContainer[0].classList.remove('green')
    }

    if (this.selectedCards.includes(textarea2)){
      textareasContainer[1].classList.add('green')
    }
    else{
      textareasContainer[1].classList.remove('green')
    }
  }

  addEntry(entry: any){
    let textareas = document.getElementsByTagName('textarea')

    if (this.selectedCards.includes(textareas[Number(entry)].value)){
      let index = this.selectedCards.indexOf(textareas[Number(entry)].value)
      this.selectedCards.splice(index, 1)
    }
    else{
      if (entry=='0'){
        this.selectedCards = this.selectedCards.filter(entry => entry != textareas[0].value)
      }
      else{
        this.selectedCards = this.selectedCards.filter(entry => entry != textareas[1].value)
      }
      if (this.selectedCards.length<2){
        if (entry=='0' && textareas[0].value!=''){
          this.selectedCards.push(textareas[0].value)
        }
        if (entry=='1' && textareas[1].value!=''){
          this.selectedCards.push(textareas[1].value)
        }
      }
      else{
        this.selectedCards.splice(1, 1)
        if (entry=='0' && textareas[0].value!=''){
          this.selectedCards.push(textareas[0].value)
        }
        if (entry=='1' && textareas[1].value!=''){
          this.selectedCards.push(textareas[1].value)
        }
      }
    }
  }

  next(){
    this.screen = 2
  }

  back(){
    this.screen = 1
    this.selectedCards = []
    this.chosenCard = []
    this.showNotSelected = false
  }

  openCard(card: any){
    let index = this.selectedCards.indexOf(card)
    document.getElementsByClassName("open-card")[index].classList.remove("hidden")
    if (this.chosenCard.length==0){
      document.getElementsByClassName("card-selected")[index].classList.add('green')
      this.chosenCard.push(document.getElementsByClassName("open-card")[index].textContent?.toString()!)
    }
    else if (this.chosenCard.length==1 && this.showNotSelected == false){
      document.getElementsByClassName("card-selected")[index].classList.add('red')
      this.showNotSelected = true
    }
    else{
      return
    }
  }
}
