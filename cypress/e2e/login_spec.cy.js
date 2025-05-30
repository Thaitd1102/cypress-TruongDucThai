describe('Login Test', () => {

  it('Should login successfully with valid credentials', () => {
    cy.visit('https://www.saucedemo.com');
    cy.wait(1000);

    cy.get('#user-name').type('standard_user');
    cy.wait(1000);

    cy.get('#password').type('secret_sauce');
    cy.wait(1000);

    cy.get('#login-button').click();
    cy.wait(1000);

    cy.url().should('include', '/inventory.html');
    cy.wait(1000);
  });

  it('Should show error message with invalid credentials', () => {
    cy.visit('https://www.saucedemo.com');
    cy.wait(1000);

    cy.get('#user-name').type('invalid_user');
    cy.wait(1000);

    cy.get('#password').type('wrong_password');
    cy.wait(1000);

    cy.get('#login-button').click();
    cy.wait(1000);

    cy.get('[data-test="error"]').should('contain', 'Username and password do not match');
    cy.wait(1000);
  });

});
