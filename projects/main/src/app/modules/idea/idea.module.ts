import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IdeasPanelComponent } from './components/ideas-panel/ideas-panel.component';
import { IdeasListComponent } from './components/ideas-list/ideas-list.component';
import { IdeaDescriptionComponent } from './components/idea-description/idea-description.component';
import { IdeaCommentsComponent } from './components/idea-comments/idea-comments.component';
import { IdeaTagsComponent } from './components/idea-tags/idea-tags.component';
import { IdeaVpcComponent } from './components/idea-vpc/idea-vpc.component';
import { IdeaDetailsComponent } from './components/idea-details/idea-details.component';
import { IdeasListItemComponent } from './components/ideas-list-item/ideas-list-item.component';
import { CoreModule } from '../../core/core.module';

@NgModule({
  declarations: [
    IdeasPanelComponent,
    IdeasListComponent,
    IdeaDescriptionComponent,
    IdeaCommentsComponent,
    IdeaTagsComponent,
    IdeaVpcComponent,
    IdeaDetailsComponent,
    IdeasListItemComponent,
  ],
  imports: [CommonModule, CoreModule],
  exports: [IdeasPanelComponent],
})
export class IdeaModule {}
