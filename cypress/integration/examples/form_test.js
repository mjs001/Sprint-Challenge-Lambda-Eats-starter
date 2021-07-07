describe("testing form inputs", function() {
  beforeEach(function() {
    cy.visit("http://localhost:3001/pizza");
  });
  it("Adds text to input, selects multiple toppings and submits", function() {
    cy.get('input[name="name"]')
      .type("olive and onion pizza")
      .should("have.value", "olive and onion pizza");
    cy.get("#size")
      .select("medium")
      .should("have.value", "medium");
    cy.get('[type="checkbox"]').check();
    cy.get("button").click();
  });
});
