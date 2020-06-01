import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  name = '';
  pets = [{ id: '1', text: 'Cat' }, { id: '2', text: 'Dog' }];

  possiblePets = [{ id: '1', text: 'Cat' }, { id: '2', text: 'Dog' },
  { id: '3', text: 'Parrot' }, { id: '4', text: 'Rabbit' },
  { id: '5', text: 'Turtle' }, { id: '6', text: 'Hamster' },
  { id: '7', text: 'Duck' }, { id: '8', text: 'Goose' }];
}
