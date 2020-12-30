import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IdeasPanelComponent } from './ideas-panel/ideas-panel.component';
import { IdeasListComponent } from './ideas-list/ideas-list.component';
import { IdeaDescriptionComponent } from './idea-description/idea-description.component';
import { IdeaCommentsComponent } from './idea-comments/idea-comments.component';
import { IdeaTagsComponent } from './idea-tags/idea-tags.component';
import { IdeaVpcComponent } from './idea-vpc/idea-vpc.component';
import { IdeaDetailsComponent } from './idea-details/idea-details.component';
import { IdeasListItemComponent } from './ideas-list-item/ideas-list-item.component';
import { CoreModule } from '../../core/core.module';
import { IdeasPanelToggleComponent } from './ideas-panel-toggle/ideas-panel-toggle.component';

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
    IdeasPanelToggleComponent,
  ],
  imports: [CommonModule, CoreModule],
  exports: [IdeasPanelComponent, IdeasPanelToggleComponent],
})
export class IdeaModule {}
