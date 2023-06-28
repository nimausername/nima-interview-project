import { PageComponent, component, html, route, state, cache, style } from '@3mo/model'
import { Photo, PhotoService } from 'data'

const enum Tab {
	Card = 'card',
	DataGrid = 'data-grid',
}

@route('/', '/photos')
@component('sample-page-photos')
export class PagePhotos extends PageComponent {
	@state() private photos = PhotoService.search()
	@state() private tab = Tab.DataGrid

	protected override get template() {
		return html`
			<mo-page heading='Startseite' fullHeight>
				<mo-tab-bar slot='headingDetails' value=${this.tab} @change=${(e: CustomEvent<Tab>) => this.tab = e.detail}>
					<mo-tab value=${Tab.DataGrid} label='Data-Grid'></mo-tab>
					<mo-tab value=${Tab.Card} label='Card'></mo-tab>
				</mo-tab-bar>

				${cache(this.tab === Tab.Card ? this.cardTemplate : this.dataGridTemplate)}
			</mo-page>
		`
	}

	private get dataGridTemplate() {
		return html`
			<mo-card style='--mo-card-body-padding: 0px'>
				<mo-data-grid detailsOnClick subDataGridDataSelector='children' pagination='auto' .data=${this.photos}>
					<mo-data-grid-column-number width='50px' heading='ID' dataSelector=${getKeyPath<Photo>('id')}></mo-data-grid-column-number>
					<mo-data-grid-column-number width='50px' heading='Album ID' dataSelector=${getKeyPath<Photo>('albumId')}></mo-data-grid-column-number>
					<mo-data-grid-column-text width='*' heading='URL' dataSelector=${getKeyPath<Photo>('url')}></mo-data-grid-column-text>
					<mo-data-grid-column-text width='*' heading='Name' dataSelector=${getKeyPath<Photo>('title')}></mo-data-grid-column-text>

					<!-- TODO [Task 1] Make these components filter data -->
					<mo-field-search slot='toolbar' label='Search' ${style({ width: '300px' })}></mo-field-search>
					<sample-field-select-album multiple slot='toolbar' default='All'></sample-field-select-album>
				</mo-data-grid>
			</mo-card>
		`
	}

	private get cardTemplate() {
		// TODO [Task 2] Implement the card template
		// TODO [Task 3] Synchronize card selection with data-grid selection
		return html`
			Grid of cards
		`
	}
}