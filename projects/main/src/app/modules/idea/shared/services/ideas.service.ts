import { Injectable } from '@angular/core';
import { Idea } from '../../../../shared/models/idea';

@Injectable({
  providedIn: 'root'
})
export class IdeasService {
  ideas: Idea[] = [];
  activeIdea: Idea;

  constructor() {
    this.testIdeas(10);
    this.activeIdea = this.ideas[0];
  }

  get ActiveIdea(): Idea { return this.activeIdea; }
  setActiveIdea(idea: Idea): void {
    this.activeIdea = idea;
  }

  testIdeas(n: number): void {
    for (let i = 0; i < n; i += 1) {
      const idea: Idea = {
        id: i.toString(),
        author: 'test',
        creationDate: Date.now(),
        description: 'Test-generated example of a an idea object #' + i.toString(),
        comments: [],
        tags: [],
        vpc: null,
      };

      this.ideas.push(idea);
    }
  }
}
