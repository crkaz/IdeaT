import { Component, OnInit } from '@angular/core';
import { Idea } from '../../../shared/models/idea';

@Component({
  selector: 'ideat-ideas-list',
  templateUrl: './ideas-list.component.html',
  styleUrls: ['./ideas-list.component.css'],
})
export class IdeasListComponent implements OnInit {
  ideas = [];

  constructor() {
    this.testIdeas(10);
  }

  ngOnInit(): void {
  }

  testIdeas(n: number): void {
    for (let i = 0; i < n; i += 1) {
      const idea: Idea = {
        id: i.toString(),
        author: 'test',
        creationDate: Date.now(),
        description: 'Test-generated example of a an idea object.',
        comments: [],
        tags: [],
        vpc: null,
      };

      this.ideas.push(idea);
    }
  }
}
