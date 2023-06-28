import { Album } from 'data/types'
import { albums } from './albums'

export class AlbumService {
	static getAll() {
		return Promise.resolve(albums as Array<Album>)
	}
}