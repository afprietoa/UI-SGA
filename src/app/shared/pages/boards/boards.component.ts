import { Component, OnInit } from '@angular/core';
import { faBox, faWaveSquare, faClock, faAngleUp, faAngleDown, faHeart, faBorderAll, faUsers, faGear } from '@fortawesome/free-solid-svg-icons';
import { faTrello } from '@fortawesome/free-brands-svg-icons';


@Component({
  selector: 'app-boards',
  templateUrl: './boards.component.html'
})
export class BoardsComponent implements OnInit {

  faTrello = faTrello;
  faBox = faBox;
  faWaveSquare = faWaveSquare;
  faClock = faClock;
  faAngleUp = faAngleUp;
  faAngleDown = faAngleDown;
  faHeart = faHeart;
  faBorderAll = faBorderAll;
  faUsers = faUsers;
  faGear = faGear;

  items = [
    {
      label: 'Resource 1',
      items: [
        {
          label: 'Sub Resource 1.1'
        },
        {
          label: 'Sub Resource 1.2'
        }
      ]
    },
    {
      label: 'Resource 2',
      items: [
        {
          label: 'Sub Resource 2.1'
        },
      ]
    },
    {
      label: 'Resource 3',
      items: [
        {
          label: 'Sub Resource 3.1'
        },
        {
          label: 'Sub Resource 3.2'
        },
        {
          label: 'Sub Resource 3.3'
        },
      ]
    }
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
