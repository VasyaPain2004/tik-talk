import { Component, inject } from '@angular/core';
import { ProfileService } from '../../data/services/profile';
import { Profile } from '../../data/interfaces/profile.interface';
import { ProfileCard } from "../../common-ui/profile-card/profile-card";

@Component({
  selector: 'app-search-page',
  imports: [ProfileCard],
  templateUrl: './search-page.html',
  styleUrl: './search-page.scss',
})
export class SearchPage {
  profileService = inject(ProfileService);
  profiles: Profile[] = [];

  constructor() {
    this.profileService.getTestAccounts().subscribe((value) => {
      this.profiles = value;
    });
  }
}
