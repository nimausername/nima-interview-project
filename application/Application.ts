import { BusinessSuiteApplication, application, component, Navigation, css } from '@3mo/model'
import { PagePhotos } from './photo'

@application()
@component('sample-app')
export class Sample extends BusinessSuiteApplication {
	static override get styles() {
		return css`
			${super.styles}

			#navbarNavigations {
				justify-content: flex-end;
			}
		`
	}

	protected get navigations() {
		return [
			{
				icon: 'collections',
				label: 'Photos',
				component: new PagePhotos,
			}
		] as Array<Navigation>
	}
}