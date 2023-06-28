import { PhotoCard } from './PhotoCard'

describe('PhotoCard', () => {
	const fixture = new ComponentTestFixture(() => new PhotoCard)

	it('should be sane!', () => {
		expect(fixture.component.tagName.toLowerCase()).toBe('sample-photo-card')
	})

	// TODO [Task 4]: Outline and implement the test cases
})