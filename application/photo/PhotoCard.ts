import { component, Component, html, nothing, property, css, style } from '@3mo/model'
import { Photo } from 'data'

@component('sample-photo-card')
export class PhotoCard extends Component {
	@property({ type: Object }) photo?: Photo
	@property({ type: Boolean, reflect: true }) selected = false

	static override get styles() {
		return css`
			:host {
				height: 100%;
				width: 100%;
			}

			mo-card {
				width: 100%;
				height: 100%;
				transition: var(--mo-duration-quick);
				position: relative;
				--mo-card-body-padding: 0px 8px 16px 8px;
			}

			mo-card:hover {
				cursor: pointer;
				transform: scale(1.1, 1.1);
			}

			img {
				border-radius: 50%;
				width: 80%;
				margin: 10% 10% 5% 10%;
				filter: grayscale(1);
			}

			:host([selected]) img {
				filter: grayscale(0);
			}

			mo-checkbox {
				position: absolute;
				top: 8px;
				right: 8px;
				z-index: 1;
			}
		`
	}

	protected override get template() {
		return !this.photo ? nothing : html`
			<mo-card>
				<mo-checkbox
					?checked=${this.selected}
					@change=${(e: CustomEvent<CheckboxValue>) => this.setSelection(e.detail === 'checked')}
				></mo-checkbox>

				<mo-flex ${style({ flex: '1' })}>
					<!-- TODO [Task 3] clicking on image should toggle the selection, also! -->
					<img src=${this.photo.thumbnailUrl} alt=${this.photo.title}>
					<mo-flex justifyContent='center' ${style({ flex: '1' })}>
						<mo-heading typography='heading5' ${style({ textAlign: 'center', width: '100%', color: 'var(--mo-accent)' })}>${this.photo.title}</mo-heading>
					</mo-flex>
				</mo-flex>
			</mo-card>
		`
	}

	protected toggleSelection() {
		// TODO [Task 3]: Add the selection logic
	}

	private setSelection(value: boolean) {
		value
		// TODO [Task 3]: Add the selection logic
	}
}

declare global {
	interface HTMLElementTagNameMap {
		'sample-photo-card': PhotoCard
	}
}