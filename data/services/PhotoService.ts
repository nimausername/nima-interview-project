import { photos } from './photos'

export class PhotoService {
	static getAll() {
		return photos
	}

	static getAllFlattened() {
		return PhotoService.getAll()
		// TODO [Task 1]: Returns all photos in a flattened structure
		// in which each photo has no children but has a parentId
	}

	static search(parameters?: { titleKeyword?: string, albumIds?: Array<number> }) {
		parameters
		// TODO [Task 1]: Search for photos whose title contain the given keyword
		// and whose albumId is included in albumIds in the flattened data.
		return this.getAllFlattened()
	}
}