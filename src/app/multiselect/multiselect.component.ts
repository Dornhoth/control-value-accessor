import {
  Component,
  ChangeDetectionStrategy,
  Input,
  Output,
  EventEmitter,
  HostListener,
  ViewChild,
  ElementRef,
  forwardRef,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

export class ListItem {
  id: string;
  text: string;
}

@Component({
  selector: 'app-multiselect',
  templateUrl: './multiselect.component.html',
  styleUrls: ['./multiselect.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => MultiselectComponent),
      multi: true
    }
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MultiselectComponent implements ControlValueAccessor {
  @ViewChild('multiselect', { static: true }) multiselect: ElementRef<any>;

  @Input() items: Array<ListItem> = [];
  @Input() selectedItems: Array<ListItem> = [];

  @Output() itemSelected = new EventEmitter<ListItem>();
  @Output() itemUnselected = new EventEmitter<ListItem>();


  open = false;
  disabled = false;

  private onChange = (_: Array<ListItem>) => { };
  private onTouch = () => { };

  @HostListener('document:click', ['$event.target'])
  public onClick(targetElement) {
    const clickedInside = this.multiselect.nativeElement.contains(targetElement);
    if (!clickedInside) {
      this.closeDropdown();
      this.onTouch();
    }
  }

  @HostListener('blur')
  public onTouched() {
    this.closeDropdown();
    this.onTouch();
  }

  writeValue(items: Array<ListItem>): void {
    this.selectedItems = items;
    this.onChange(this.selectedItems);
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  onItemClick(item: ListItem) {
    const found = this.isItemAlreadySelected(item);
    if (!found) {
      this.select(item);
    } else {
      this.unselect(item);
    }
    this.onChange(this.items);
  }

  trackByFn(index, item) {
    return item.id;
  }

  isItemAlreadySelected(clickedItem: ListItem) {
    let found = false;
    this.selectedItems.forEach(item => {
      if (clickedItem.id === item.id) {
        found = true;
      }
    });
    return found;
  }

  toggleDropdown() {
    this.open = !this.open;
  }

  closeDropdown() {
    this.open = false;
  }

  private select(item: ListItem) {
    this.selectedItems.push(item);
    this.itemSelected.emit(item);
  }

  private unselect(itemSel: ListItem) {
    this.selectedItems.forEach(item => {
      if (itemSel.id === item.id) {
        this.selectedItems.splice(this.selectedItems.indexOf(item), 1);
      }
    });
    this.itemUnselected.emit(itemSel);
  }
}
