import { ComponentType } from "@angular/cdk/portal";
import { AfterContentInit, Component, ViewChild } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import { Store } from "@ngxs/store";
import { Observable, of, withLatestFrom } from "rxjs";
import { AppInjector } from "@app/app.injector";
import { DoSearch, SetSearch } from "@app/app.state";
import { Page } from "@app/model/page";
import { AuthService } from "@app/services/auth.service";
import { ConfirmDialogComponent } from "./confirm-dialog/confirm-dialog.component";

export class State {
  page: (state: any) => any;
  entity: (state: any) => any;
  constructor(page: (state: any) => any, entity: (state: any) => any) {
    this.page = page;
    this.entity = entity;
  }
}

@Component({ template: '' })
export abstract class ListViewComponent<T> implements AfterContentInit {

  page: Page<T> = { content: [], totalElements: 0, number: 0, size: 5 };
  dataSource: MatTableDataSource<T> = new MatTableDataSource(this.page.content);
  displayedColumns: string[] = [];
  protected entityInfo$: Observable<T>;
  protected pageInfo$: Observable<Page<T>>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  private dialog: MatDialog;
  protected store: Store;
  auth: AuthService;
  isLoading$: Observable<boolean> = of(true);
  selected: T = {} as T;

  constructor(private state: State, private getData: Function, displayedColumns: Array<string>) {
    this.store = AppInjector.get(Store);
    this.store.dispatch(new SetSearch(this.search.bind(this)));
    const initial = this.getData.bind(this);
    this.getData = () => {
      this.store.dispatch(new DoSearch(false));
      initial();
    }
    this.pageInfo$ = this.store.select(this.state.page);
    this.entityInfo$ = this.store.select(this.state.entity);
    this.displayedColumns = displayedColumns;
    this.dialog = AppInjector.get(MatDialog);
    this.auth = AppInjector.get(AuthService);
    for (let i = 0; i < this.page.size; i++) {
      this.page.content.push({} as T);
    }
  }

  ngAfterContentInit(): void {
    this.getData();
  }

  getResources(action: any, callback?: Function): void {
    this.isLoading$ = this.store.select(state => state.appstate.isLoading);
    this.selected = {} as T;
    this.store.dispatch(action)
      .pipe(withLatestFrom(this.pageInfo$)).subscribe(([_, page]) => {
        this.update(page);
        callback?.(page);
      });
  }

  getResource(action: any, component: ComponentType<any>, callback?: Function): void {
    if(!this.store.selectSnapshot(state => state.appstate.isLoading)) {
      this.isLoading$ = of(false);
      this.store.dispatch(action)
        .pipe(withLatestFrom(this.entityInfo$)).subscribe(([_, entity]) => {
          this.show(component, entity);
          this.selected = entity;
          callback?.(entity);
        });
    }
  }

  editResource(action: any, component: ComponentType<any>, callback?: Function): void {
    this.isLoading$ = of(false);
    this.getResource(action, component, callback);
  }

  deleteResource(action: any, callback?: Function): void {
    this.isLoading$ = of(false);
    this.confirm(() => {
      this.store.dispatch(action)
        .pipe(withLatestFrom(this.pageInfo$)).subscribe(([_, page]) => {
          this.update(page);
          callback?.(page);
        });
    });
  }

  search(query: string): void {
    this.purgeData();
    this.refreshDataSource();
    this.isLoading$ = this.store.select(state => state.appstate.isLoading);
    this.page.number = 0;
    this.selected = {} as T;
    if (query.trim()) {
      this.store.dispatch(new DoSearch(true, query));
      this.handleSearch(query);
    } else {
      this.getData();
    }
  }

  abstract handleSearch(query: string): void;

  handlePagination(event: any): void {
    this.isLoading$ = this.store.select(state => state.appstate.isLoading);
    this.page.number = event.pageIndex;
    this.page.size = event.pageSize;
    const isSearching = this.store.selectSnapshot(state => state.appstate.isSearching);
    const searchQuery = this.store.selectSnapshot(state => state.appstate.searchQuery);
    isSearching ? this.handleSearch(searchQuery) : this.getData();
  }

  refreshDataSource(): void {
    this.dataSource = new MatTableDataSource(this.page.content);
    this.handleSorting();
    this.dataSource.sort = this.sort;
    this.paginator.pageIndex = this.page.number;
  }

  refresh(): void {
    this.page.number = 0;
    this.purgeData();
    this.getData();
  }

  update(page: Page<T>): void {
    this.page = page;
    (this.page.totalElements == this.page.size && this.page.content.length < this.page.size) ? this.getData() : this.refreshDataSource();
  }

  handleSorting(): void {
    this.dataSource.sortingDataAccessor = (entity, property) => {
      return this.getProperty(entity, property as keyof T);
    };
  }

  show(component: ComponentType<any>, data: T): void {
    this.dialog.open(component, {
      data: data
    });
  }

  confirm(callback: Function): void {
    this.dialog.open(ConfirmDialogComponent, {
      data: callback,
      disableClose: true
    });
  }

  getProperty(entity: T, k: any): any {
    return entity[k as keyof T];
  }

  private purgeData() {
    const length = this.page.content.length;
    this.page.content = [];
    for (let i = 0; i < length; i++) {
      this.page.content.push({} as T);
    }
    this.refreshDataSource();
  }

}