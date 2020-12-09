import '@polymer/iron-icon';
import { showNotification } from '@vaadin/flow-frontend/a-notification';
import { EndpointError } from '@vaadin/flow-frontend/Connect';
import { CSSModule } from '@vaadin/flow-frontend/css-utils';
import { Binder, field } from '@vaadin/form';
import '@vaadin/vaadin-button/vaadin-button';
import '@vaadin/vaadin-date-picker';
import '@vaadin/vaadin-form-layout/vaadin-form-layout';
import '@vaadin/vaadin-grid';
import { GridDataProviderCallback, GridDataProviderParams, GridElement } from '@vaadin/vaadin-grid/vaadin-grid';
import '@vaadin/vaadin-grid/vaadin-grid-sort-column';
import '@vaadin/vaadin-icons';
import '@vaadin/vaadin-ordered-layout/vaadin-horizontal-layout';
import '@vaadin/vaadin-split-layout/vaadin-split-layout';
import '@vaadin/vaadin-text-field';
import '@vaadin/vaadin-text-field/vaadin-integer-field';
import '@vaadin/vaadin-upload';
import '@vaadin/vaadin-combo-box';
import '@vaadin/vaadin-time-picker';

import { customElement, html, LitElement, property, query, unsafeCSS } from 'lit-element';
import Command from '../../generated/es/codemotion/rte/data/entity/Command';
import CommandModel from '../../generated/es/codemotion/rte/data/entity/CommandModel';
import * as CommandEndpoint from '../../generated/CommandEndpoint';
// @ts-ignore
import styles from './orders-view.css';

@customElement('orders-view')
export class OrdersView extends LitElement {
  static get styles() {
    return [CSSModule('lumo-typography'), unsafeCSS(styles)];
  }

  @query('#grid')
  private grid!: GridElement;

  @property({ type: Number })
  private gridSize = 0;

  private gridDataProvider = this.getGridData.bind(this);

  private binder = new Binder<Command, CommandModel>(this, CommandModel);

  render() {
    return html`
      <vaadin-split-layout class="full-size">
        <div class="grid-wrapper">
          <vaadin-grid
            id="grid"
            class="full-size"
            theme="no-border"
            .size="${this.gridSize}"
            .dataProvider="${this.gridDataProvider}"
            @active-item-changed=${this.itemSelected}>

            <vaadin-grid-sort-column path="tableNumber"></vaadin-grid-sort-column>
            <vaadin-grid-sort-column path="type"></vaadin-grid-sort-column>
            <vaadin-grid-sort-column path="description"></vaadin-grid-sort-column>
            <vaadin-grid-sort-column path="quantity"></vaadin-grid-sort-column>
            <vaadin-grid-sort-column path="hour"></vaadin-grid-sort-column>
            <vaadin-grid-column path="served">
              <template>
                <vaadin-checkbox checked="[[item.important]]" disabled></vaadin-checkbox>
              </template>
            </vaadin-grid-column>
          </vaadin-grid>
        </div>
        <div id="editor-layout">
          <div id="editor">
            <vaadin-form-layout>
              <vaadin-combo-box label="Table"
                .items="${[1,2,3,4,5,6,7,8,9]}"
                ...="${field(this.binder.model.tableNumber)}">
              </vaadin-combo-box>
              <vaadin-combo-box label="Type"
                .items = "${['bebida', 'tapa', 'ración', 'plato', 'postre']}"
                ...="${field(this.binder.model.type)}">
              </vaadin-combo-box>
              <vaadin-text-field  label="Description"
                ...="${field(this.binder.model.description)}"></vaadin-text-field>
              <vaadin-text-field label="Hour" readonly
                ...="${field(this.binder.model.hour)}">
              </vaadin-text-field>
              <vaadin-integer-field label="Quantity"
                ...="${field(this.binder.model.quantity)}">
              </vaadin-integer-field>
              <vaadin-checkbox
                ...="${field(this.binder.model.served)}">
                Served
              </vaadin-checkbox>
              </vaadin-form-layout>
          </div>
          <vaadin-horizontal-layout id="button-layout" theme="spacing">
            <vaadin-button theme="primary" @click="${this.save}">Save</vaadin-button>
            <vaadin-button theme="tertiary" @click="${this.cancel}">New</vaadin-button>
          </vaadin-horizontal-layout>
        </div>
      </vaadin-split-layout>
    `;
  }

  private async getGridData(params: GridDataProviderParams, callback: GridDataProviderCallback) {
    const index = params.page * params.pageSize;
    const data = await CommandEndpoint.list(index, params.pageSize, params.sortOrders as any);
    callback(data);
  }

  async connectedCallback() {
    super.connectedCallback();
    this.gridSize = await CommandEndpoint.count();
  }

  private async itemSelected(event: CustomEvent) {
    const item: Command = event.detail.value as Command;
    this.grid.selectedItems = item ? [item] : [];

    if (item && item.id) {
      const fromBackend = await CommandEndpoint.get(item.id);
      fromBackend ? this.binder.read(fromBackend) : this.refreshGrid();
    } else {
      this.clearForm();
    }
  }

  private async save() {
    try {
      if (!this.binder.value.id) {
        // We added a new item
        this.gridSize++;
      }

      const deferrableResult = await this.binder.submitTo(CommandEndpoint.update);
      if (deferrableResult.isDeferred) {
        showNotification('Command details deferred.', { position: 'bottom-start' });        
      } else {
        this.clearForm();
        this.refreshGrid();        
        showNotification('Command details saved.', { position: 'bottom-start' });        
      }


    } catch (error) {
      if (error instanceof EndpointError) {
        showNotification('Server error. ' + error.message, { position: 'bottom-start' });
      } else {
        throw error;
      }
    }
  }

  private cancel() {
    this.grid.activeItem = undefined;
  }

  private clearForm() {
    this.binder.clear();
  }

  private refreshGrid() {
    this.grid.selectedItems = [];
    this.grid.clearCache();
  }
}
