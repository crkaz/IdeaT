export interface Idea {
  id: string;
  author: string;
  creationDate: number;
  description: string;
  comments: string[];
  tags: string[];
  vpc: any;
  drawnObjects: any[];
  stickies: any[];
}
