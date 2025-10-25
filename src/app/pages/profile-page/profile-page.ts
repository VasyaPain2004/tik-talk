import { Component, inject } from '@angular/core';
import { ProfileHeader } from "../../common-ui/profile-header/profile-header";
import { ProfileService } from '../../data/services/profile';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { switchMap } from 'rxjs';
import { toObservable } from '@angular/core/rxjs-interop';
import { AsyncPipe } from '@angular/common';
import { ImgUrlPipe } from '../../helpers/pipes/img-url-pipe';
import { PostFeed } from "./post-feed/post-feed";
import { Tag } from '../../common-ui/tag/tag';

@Component({
  selector: 'app-profile-page',
  imports: [ProfileHeader, AsyncPipe, RouterLink, ImgUrlPipe, Tag, PostFeed],
  templateUrl: './profile-page.html',
  styleUrl: './profile-page.scss'
})
export class ProfilePage {
  profileService = inject(ProfileService)
  route = inject(ActivatedRoute)

  me$ = toObservable(this.profileService.me)
  subscribers$ = this.profileService.getSubscribersShortList(6)

  profile$ = this.route.params.pipe(
    switchMap(({id}) => {
      if (id === 'me') return this.me$
      
      return this.profileService.getAccount(id)
    })
  )
}
