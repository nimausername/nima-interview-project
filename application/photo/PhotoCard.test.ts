import { ComponentTestFixture } from '@a11d/lit/dist/test'

describe('PhotoCard', () => {
	const fixture = new ComponentTestFixture('sample-photo-card')

	it('should be sane!', () => {
		expect(fixture.component.tagName.toLowerCase()).toBe('sample-photo-card')
	})

	// TODO [Task 4]: Outline and implement the test cases
}) 