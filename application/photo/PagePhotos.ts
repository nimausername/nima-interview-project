import { PageComponent, component, html, route, state,  style } from '@3mo/del' //List
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
	@state() private visibleCardCount = 0;




	protected override get template() {
		return html`
			<mo-page heading='Startseite' fullHeight>
				<mo-tab-bar slot='headingDetails' value=${this.tab} @change=${(e: CustomEvent<Tab>) => this.tab = e.detail}>
					<mo-tab value=${Tab.DataGrid} label='Data-Grid'></mo-tab>
					<mo-tab value=${Tab.Card} label='Card'></mo-tab>
				</mo-tab-bar>

				${this.tab === Tab.Card ? this.cardTemplate : this.dataGridTemplate}
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
					<mo-field-search slot='toolbar' label='Search' ${style({ width: '300px' })} @input=${(event: InputEvent) => this.handleSearch(event.detail)}></mo-field-search>
					<sample-field-select-album multiple slot='toolbar' default='All'></sample-field-select-album>
				</mo-data-grid>
			</mo-card>
		`
	}

	private handleSearch(searchValue: string) {
		// Perform filtering based on the searchValue
		const filteredPhotos = PhotoService.search().filter(photo =>	// filter function returns true if the photo should be included in the result
			photo.title.toLowerCase().includes(searchValue.toLowerCase())	// filter by title
		);

		// Update the data grid with the filtered results
		this.photos = filteredPhotos;	//this.photos is the replaced with the filteredPhotos. because <mo-data-grid .data=${this.photos}> is used in the template
	}

	private get cardTemplate() {
		let limit = 50;	//limit is the number of photos to be displayed
		let start = 0;	//start is the starting index of the photos to be displayed
		let end = start + limit + this.visibleCardCount;	//end is the ending index of the photos to be displayed
		this.visibleCardCount = end;	//visibleCardCount is the number of photos that are currently displayed

		return html`
		<mo-grid rows='1fr 1fr' columns="1fr 1fr" gap="50px">
		  ${this.photos.slice(start, end).map(photo =>	//slice(start, end) returns a shallow copy of a portion of an array into a new array object selected from start to end (end not included). The original array will not be modified.
				html`
				  <sample-photo-card .photo=${photo}></sample-photo-card>
				`
			)}
		</mo-grid>
	  `;
	}

	override async connectedCallback() {
		await super.connectedCallback();
		window.addEventListener('scroll', this.handleScroll);	//handleScroll is called when the user scrolls the page
	}

	override async disconnectedCallback() {
		await super.disconnectedCallback();
		window.removeEventListener('scroll', this.handleScroll);	//handleScroll is called when the user scrolls the page
	}

	handleScroll() {
		const isAtBottom = (window.innerHeight + window.scrollY) >= document.body.offsetHeight;		//isAtBottom is true if the user has scrolled to the bottom of the page
		if (isAtBottom) {
			console.log("it has to be works..")
			this.cardTemplate	//its not works correctly.. but when i switch to data grid and back to card it works without scrolling
		}
	}
}