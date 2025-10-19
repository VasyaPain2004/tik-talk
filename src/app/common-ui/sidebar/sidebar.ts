import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ProfileService } from '../../data/services/profile';
import { AsyncPipe } from '@angular/common';
import { ImgUrlPipe } from '../../helpers/pipes/img-url-pipe';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-sidebar',
  imports: [RouterLink, AsyncPipe, ImgUrlPipe],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.scss'
})
export class Sidebar {
  profileService = inject(ProfileService)
  subscribers$ = this.profileService.getSubscribersShortList()
  me = this.profileService.me

  ngOnInit() {
    firstValueFrom(this.profileService.getMe())
  }
}
