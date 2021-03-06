import {
  Component,
  OnInit,
  HostListener,
  ElementRef,
  ViewChild,
  AfterViewInit
} from '@angular/core';
import {
  FormListConfig,
  Form,
  SearchService,
  CommonsService,
  UserService,
  User
} from '../../core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html'
})
export class SearchComponent implements OnInit, AfterViewInit {

  @ViewChild('userFormsTab', { static: false }) userFormsTab: ElementRef;
  @ViewChild('predictionsContainer', { static: false }) predictionsContainer: ElementRef;

  public isAuthenticated: boolean;
  public currentUser: String;
  public listConfig: FormListConfig = new FormListConfig();
  public loadingQuery = false;
  public results: Array<any> = [];
  public limit: number = 10;
  public currentPage: number = 1;
  public noMoreForms: boolean = false;
  public userFormsTabsActive: boolean = false;
  public formsFirstLoad = false;
  public allPredictions: Array<any> = [];
  public predictions: Array<any> = [];

  constructor(
    private userService: UserService,
    private searchService: SearchService,
    private commonsService: CommonsService,
    private location: Location
  ) { }

  ngOnInit() {
    this.loadingQuery = true;
    this.listConfig.orderBy = 'Date';
    this.setListTo();
    this.userService.isAuthenticated.subscribe(
      (authenticated) => {
        this.isAuthenticated = authenticated;
        // Load the current user's data
        this.userService.currentUser.subscribe(
          (user: User) => {
            this.currentUser = user.username;
          });
      }
    );
    this.searchService.getAllFormsList().subscribe((formList) => {
      this.allPredictions = formList;
    })
  }

  ngAfterViewInit() {
    if (this.commonsService.isServer()) {
      if (this.commonsService.getServerReq().originalUrl === '/search/user-forms') {
        this.searchService.search(this.listConfig)
          .subscribe(forms => {
            this.results = forms;
          });
      }
    } else {
      if (window.location.pathname === '/search/user-forms') {
        this.userFormsTab.nativeElement.click();
      } else {
        this.location.replaceState('/');
      }
    }
  }


  setListTo() {
    // Takes all forms
    this.listConfig = {
      limit: this.limit,
      orderBy: 'Date',
      offset: (this.limit * (this.currentPage - 1)),
      query: '',
      public: true
    };
  }

  setVisibilityOfFooter(visible: boolean) {
    document.getElementsByTagName('footer')[0].hidden = visible;
  }

  moreForms() {
    this.loadingQuery = true;
    this.setPageTo();
    // Create limit and offset filter (if necessary)
    if (this.limit) {
      this.listConfig.limit = this.limit;
      this.listConfig.offset = (this.limit * (this.currentPage - 1));
    }
    this.searchService.search(this.listConfig).subscribe(forms => {
      if (forms.length !== 0) {
        this.results = this.results.concat(forms);
        this.setVisibilityOfFooter(true);
      } else {
        this.noMoreForms = true;
        this.setVisibilityOfFooter(false);
      }
      this.loadingQuery = false;
    });
  }

  @HostListener('window:scroll', []) onScroll(): void {
    if (!this.loadingQuery && !this.noMoreForms && this.userFormsTabsActive) {
      if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
        this.moreForms();
      }
    }
  }

  search(inputSearch: any) {
    this.loadingQuery = true;
    this.listConfig.offset = 0;
    this.currentPage = 1;
    this.results = [];
    this.noMoreForms = false;
    this.listConfig.query = inputSearch;

    this.searchService.search(this.listConfig)
      .subscribe(forms => {
        this.loadingQuery = false;
        this.results = forms;
      });
  }

  setPredictions(e: InputEvent) {
    const searchValue = (e.target as HTMLInputElement).value;
    if (!searchValue) {
      this.predictions = [];
      return;
    }
    this.predictions = this.allPredictions.map((form) => {
      if (form.title.toLowerCase().includes(searchValue.toLowerCase())) return form
    }).filter((mapResult) => {
      if (mapResult) return mapResult
    })
  }

  showPredictions() {
    this.predictionsContainer.nativeElement.style.display = "block";
  }
  hidePredictions() {
    let hidePredictions = true
    document.querySelectorAll(':hover').forEach((el) => {
      if (el.classList.contains('lawyer-forms__title__finder__predictions')) hidePredictions = false
    })
    if (hidePredictions) this.predictionsContainer.nativeElement.style.display = "none";
  }

  setPageTo() {
    this.currentPage += 1;
  }

  setOrder(order: string) {
    this.loadingQuery = true;
    this.listConfig.offset = 0;
    this.currentPage = 1;
    this.results = [];
    this.noMoreForms = false;
    this.listConfig.orderBy = order;
    this.searchService.search(this.listConfig).subscribe(forms => {
      this.loadingQuery = false;
      this.results = forms;
    });
  }

  setUrl(userForms: boolean) {
    if (!this.formsFirstLoad) {
      this.searchService.search(this.listConfig)
        .subscribe(forms => {
          this.loadingQuery = false;
          this.results = forms;
          this.formsFirstLoad = true;
        });
    }
    this.userFormsTabsActive = userForms;
    if (userForms) {
      this.location.replaceState('/search/user-forms');
    } else {
      this.location.replaceState('/');
    }
  }
}
