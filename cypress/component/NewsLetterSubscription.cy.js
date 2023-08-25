// cypress/component/NewsLetterSubscription.cy.js file

import App from "../.././src/components/App";

describe("NewsLetterSubscription.cy.js", () => {
  describe("NewsLetterSubscription.cy.js", () => {

    it('should mock API call made in useEffect', () => {
      cy.mount(<App />);
      cy.intercept('GET', 'https://api.publicapis.org/entries', { fixture: 'example.json' }).as('getUserData');
    

      // Wait for the API call to complete
      cy.wait('@getUserData').then(() => {
        
        // Assert that the DOM has been updated based on the mocked response
        cy.get('#apiValue').should('contain', 12345);
      });
    });

    it("Check input field for placeholder", () => {
      cy.wait(1000);
      cy.mount(<App />); // mount the component
      cy.get("input").should("have.attr", "placeholder", "Subscribe to our newsletter"); // check the placeholder in the input field
    });

    it("test newsletter subscription", () => {
      cy.wait(1000);
      cy.mount(<App />); // mount the component
      cy.get('[data-test="email-input"]').type("test@gmail.com"); // Type email
      cy.get('[data-test="submit-button"]').click(); // Click on submit button
      cy.get('[data-test="success-message"]')
        .should("exist")
        .contains("Thank you for subscribing to our newsletter"); // Check if success message is displayed
    });

    it("test success message negation", () => {
      cy.wait(1000);
      cy.mount(<App />)
      cy.get('[data-test="submit-button"]').click();
      cy.get('[data-test="success-message"]')
      .should("not.be.visible")
    })

    it("test state value before click", () => {
      cy.mount(<App />)
      cy.wait(3000);
      cy.get('[data-test="marked-value"]')
      .should("exist")
      .contains("UnChecked")
    })

    it("test click and state update", () => {
      cy.wait(1000);
      cy.mount(<App />)
      cy.get('[data-test="box-marker"]').click();
      cy.get('#value')
      .should("exist")
      .contains("Check")
    })
  });
});
