import { ComponentType } from "@angular/cdk/portal";
import { Component, OnInit, ViewChild } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import { Store } from "@ngxs/store";
import { Observable } from "rxjs";
import { DoSearch, SetSearch } from "../app.state";
import { Page } from "../model/page";
import { ConfirmDialogComponent } from "./confirm-dialog/confirm-dialog.component";

@Component({ template: '' })
export abstract class ListView<T> implements OnInit {

  page: Page<T> = { content: [], totalElements: 0, number: 0, size: 5 };
  dataSource: MatTableDataSource<T> = new MatTableDataSource(this.page.content);
  displayedColumns: string[] = [];
  protected entityInfo$: Observable<T>;
  protected pageInfo$: Observable<Page<T>>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(protected store: Store, protected dialog: MatDialog, private getData: Function) {
    this.store.dispatch(new SetSearch(this.search.bind(this)));
    const initial = this.getData.bind(this);
    this.getData = () => {
      this.store.dispatch(new DoSearch(false));
      initial();
    }
  }

  ngOnInit(): void {
    this.getData();
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

  getProperty<K extends keyof T>(entity: T, k: K): any {
    return entity[k];
  }

}