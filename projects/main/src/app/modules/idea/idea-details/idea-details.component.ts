import { Component, OnInit } from '@angular/core';
import { IdeasService } from '../shared/services/ideas.service';

@Component({
  selector: 'ideat-idea-details',
  templateUrl: './idea-details.component.html',
  styleUrls: ['./idea-details.component.css'],
})
export class IdeaDetailsComponent implements OnInit {
  constructor(public ideas: IdeasService) { }

  ngOnInit(): void { }
}
