import { component, html, FieldFetchableSelect, property } from '@3mo/model'
import { Album, AlbumService } from 'data'

@component('sample-field-select-album')
export class FieldSelectAlbum extends FieldFetchableSelect<Album> {
	@property() override label = 'Album'

	override fetch = AlbumService.getAll

	override optionTemplate = (album: Album) => html`
		<mo-option .data=${album} value=${album.id}>${album.title}</mo-option>
	`
}

declare global {
	interface HTMLElementTagNameMap {
		'sample-field-select-album': FieldSelectAlbum
	}
}