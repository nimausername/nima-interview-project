export type Photo = {
	id: number
	// TODO [Task 1] Add the additional parentId property of type number
	// TODO [Task 1] Define the getter `isRoot` to return true if the photo has no parentId
	albumId: number
	title: string
	url: string
	thumbnailUrl: string
	children: Array<Photo>,
	selected: boolean	// TODO [Task 2] Add the selected property of type boolean
}