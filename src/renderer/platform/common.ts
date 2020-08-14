import {resources} from '@src/resources';
import {htmlToElement} from '@src/utils';

const goBackButton = htmlToElement(
  resources.html.common.goBackButton,
) as HTMLButtonElement;

goBackButton.onclick = () => history.back();

export function addGoBackButton(): void {
  document.body.appendChild(goBackButton);
}
