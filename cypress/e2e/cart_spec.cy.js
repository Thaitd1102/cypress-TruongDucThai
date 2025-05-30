describe('Cart Test', () => {

  beforeEach(() => {
    cy.visit('https://www.saucedemo.com');
    cy.wait(1000);

    cy.get('#user-name').type('standard_user');
    cy.wait(1000);

    cy.get('#password').type('secret_sauce');
    cy.wait(1000);

    cy.get('#login-button').click();
    cy.wait(1000);
  });

  it('Should add a product to the cart', () => {
    cy.get('.inventory_item').first().find('button').click();
    cy.wait(1000);

    cy.get('.shopping_cart_badge').should('have.text', '1');
    cy.wait(1000);
  });

  it('Should remove a product from the cart', () => {
    cy.get('.inventory_item').first().find('button').click();
    cy.wait(1000);

    cy.get('.shopping_cart_badge').should('have.text', '1');
    cy.wait(1000);

    cy.get('.inventory_item').first().find('button').click();
    cy.wait(1000);

    cy.get('.shopping_cart_badge').should('not.exist');
    cy.wait(1000);
  });

  it('Should sort products by price low to high', () => {
    cy.get('.product_sort_container').select('lohi');
    cy.wait(1000);

    cy.get('.inventory_item_price').then($prices => {
      const prices = [...$prices].map(el => parseFloat(el.innerText.replace('$', '')));
      const sorted = [...prices].sort((a, b) => a - b);
      expect(prices).to.deep.equal(sorted);
    });
    cy.wait(1000);
  });

  it('Should complete checkout process', () => {
    cy.get('.inventory_item').first().find('button').click();
    cy.wait(1000);

    cy.get('.shopping_cart_link').click();
    cy.wait(1000);

    cy.get('[data-test="checkout"]').click();
    cy.wait(1000);

    cy.get('[data-test="firstName"]').type('John');
    cy.wait(1000);

    cy.get('[data-test="lastName"]').type('Doe');
    cy.wait(1000);

    cy.get('[data-test="postalCode"]').type('12345');
    cy.wait(1000);

    cy.get('[data-test="continue"]').click();
    cy.wait(1000);

    cy.url().should('include', '/checkout-step-two.html');
    cy.wait(1000);
  });

});
