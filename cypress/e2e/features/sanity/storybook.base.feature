@storybook @sanity 

Feature: LUI Storybook Tests (Without Iframe) - Base Theme

  Background:
    Given I launch the LUI Storybook app
    
  Scenario: Verify the Artwork foregroundSrc control
    When I navigate to 'Artwork' with 'Base' theme in Storybook
    And I set the 'foregroundSrc' to 'none' for 'Artwork' component
    Then I verify that the 'Artwork' 'Foreground Image' component does not exist in Storybook
    And I select 'Image URL' for the 'foregroundSrc' control for the 'Artwork' component in Storybook
    And I verify that the 'Artwork' 'Foreground Image' component is displayed in Storybook Iframe