import {resources} from '../../resources';
import {htmlToElement} from '../../utils';

const goBackButton = htmlToElement(
  resources.html.common.goBackButton,
) as HTMLButtonElement;

goBackButton.onclick = () => history.back();

export function addGoBackButton(): void {
  document.body.appendChild(goBackButton);
}
