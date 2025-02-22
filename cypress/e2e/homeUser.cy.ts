describe("Home User", () => {
    it("Halaman User", () => {
      cy.visit("http://localhost:3000");
      cy.get ("[name='user']").click();
      cy.get("#conten").scrollIntoView();
      
    });
  });
  