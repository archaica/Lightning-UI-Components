import Icon from '../pageObjects/elements/icon.element';
import Badge from '../pageObjects/elements/badge.element';
import CheckBox from '../pageObjects/elements/checkbox.element';
import Label from '../pageObjects/elements/label.element';

import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor';

function getPageObject(pageName) {
  let pageObject = null;

  if (pageName === 'icon') {
    pageObject = Icon;
  } else if (pageName === 'badge') {
    pageObject = Badge;
  } else if (pageName === 'checkbox') {
    pageObject = CheckBox;
  } else if (pageName === 'label') {
    pageObject = Label;
  } else {
    throw new Error(
      `${pageName} page not found! \nPlease check the page object name or implement the missing case.`
    );
  }

  return pageObject;
}

export default function () {
  /**
   * @module Common
   * @function I launch the LUI app
   * @description Cucumber statement to navigate to LUI app root
   * @example I launch the LUI app
   */
  Given('I launch the LUI app', () => {
    cy.visit('/');
  });

  /**
   * @module Common
   * @function I navigate to {String} {String} with {String} theme
   * @description Cucumber statement to navigate to the specified page with the specified story and theme
   * @param {String} pageName - the page to navigate to
   * @param {String} storyName - the story to be used
   * @param {String} themeName - the theme to be used
   * @example I navigate to 'Button' 'Basic' with  'Base' theme
   */
  When(
    'I navigate to {string} {string} with {string} theme',
    (pageName, storyName, themeName) => {
      const page = pageName.toLowerCase();
      const story = storyName.toLowerCase();
      const theme = themeName.toLowerCase();
      const pageObject = getPageObject(page);

      pageObject.navigate(story, theme);
    }
  );

  /**
   * @module Common
   * @function I verify that the {String} component is displayed
   * @description Cucumber statement to verify that the component is displayed
   * @param {String} componentName
   * @example I verify that the 'Icon' component is displayed
   */
  Then('I verify that the {string} component is displayed', componentName => {
    const page = componentName.toLowerCase();
    const pageObject = getPageObject(page);
    pageObject._getElementByName(componentName).should('be.visible');
  });

  /**
   * @module Common
   * @function I verify the {String} {String} component with visual regression
   * @description Cucumber statement to verify the visual regression of an element on a particular page
   * Note: This step does not do any navigation, instead it assumes
   * that you are already on the page you want to verify the element on.
   * @param {String} elementName - The name of the element to verify, this map to the name of the element in the page object.
   * @param {String} storyName - The name of the story to verify the element on. (this can also include the page and the theme, e.g. "Icon SVG")
   * @example I verify the 'Icon' 'SVG' component with visual regression
   */
  Then(
    'I verify the {string} {string} component with visual regression',
    (elementName, storyName) => {
      const page = elementName.toLowerCase();
      const pageObject = getPageObject(page);
      const viewPort = `${Cypress.config().viewportWidth}x${
        Cypress.config().viewportHeight
      }`;

      cy.hidePadding()
        .wait(1000)
        .then(() => {
          pageObject
            ._getElementByName(elementName)
            .vrtTrack(`${elementName} (${storyName})`, {
              keepScreenshot: true,
              viewport: `${viewPort}`,
              retryLimit: 1
            });
        });
    }
  );

  /**
   * @module Common
   * @function I set the {String} to {String} for {String} component
   * @description Cucumber statement to set the specified element to the specified value
   * @param {String} prop
   * @param {String} value
   * @param {String} pageName
   * @example I set the 'height' to '85' for 'Icon' component
   */
  Then(
    'I set the {string} to {string} for {string} component',
    (prop, value, pageName) => {
      const page = pageName.toLowerCase();
      const pageObject = getPageObject(page);

      pageObject.setProp(prop, value);
    }
  );

  /**
   * @module Common
   * @function I verify that the {String} of {String} component is {String}
   * @description Cucumber statement to verify the property of a component
   * @example I verify that the 'height' of 'Icon' component is '85px'
   */
  Then(
    'I verify that the {string} of {string} component is {string}',
    (property, pageName, value) => {
      const page = pageName.toLowerCase();
      const pageObject = getPageObject(page);

      pageObject
        ._getElementByName(page)
        .should('have.attr', 'style')
        .should('contain', `${property}: ${value}`);
    }
  );
}