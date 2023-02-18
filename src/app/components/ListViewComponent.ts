import { ComponentType } from "@angular/cdk/portal";
import { Component, OnInit, ViewChild } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import { ActivatedRoute } from "@angular/router";
import { Store } from "@ngxs/store";
import { Observable, withLatestFrom } from "rxjs";
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
export abstract class ListViewComponent<T> implements OnInit {

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
  protected route: ActivatedRoute;

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
    this.route = AppInjector.get(ActivatedRoute);
  }

  ngOnInit(): void {
    this.getData();
  }

  getResources(action: any): void {
    this.store.dispatch(action)
      .pipe(withLatestFrom(this.pageInfo$)).subscribe(([_, page]) => {
        this.update(page);
      });
  }

  getResource(action: any, component: ComponentType<any>): void {
    this.store.dispatch(action)
      .pipe(withLatestFrom(this.entityInfo$)).subscribe(([_, entity]) => {
        this.show(component, entity);
      });
  }

  editResource(action: any, component: ComponentType<any>): void {
    this.getResource(action, component);
  }

  deleteResource(action: any): void {
    this.confirm(() => {
      this.store.dispatch(action)
        .pipe(withLatestFrom(this.pageInfo$)).subscribe(([_, page]) => {
          this.update(page);
        });
    });
  }

  search(query: string): void {
    this.page.number = 0;
    if (query.trim()) {
      this.store.dispatch(new DoSearch(true, query));
      this.handleSearch(query);
    } else {
      this.getData();
    }
  }

  abstract handleSearch(query: string): void;

  handlePagination(event: any): void {
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

  protected getParam(name: string): string | null {
    return this.route.snapshot.paramMap.get(name);
  }

}