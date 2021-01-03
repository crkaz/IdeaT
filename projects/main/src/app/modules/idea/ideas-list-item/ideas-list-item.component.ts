import { Component, Input, OnInit } from '@angular/core';
import { Idea } from '../../../shared/models/idea';

@Component({
  selector: 'ideat-ideas-list-item',
  templateUrl: './ideas-list-item.component.html',
  styleUrls: ['./ideas-list-item.component.css']
})
export class IdeasListItemComponent implements OnInit {
  @Input() idea: Idea;
  
  constructor() { }

  ngOnInit(): void {
  }

}
