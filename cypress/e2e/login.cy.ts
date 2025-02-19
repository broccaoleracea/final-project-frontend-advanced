describe("Home Login", () => {
    it("Halaman Login", () => {
      cy.visit("http://localhost:3000/auth/login");
      cy.get ("[name='email']").type("Rafa@gmail.com");
      cy.get ("[name='password']").type("rafa123");
      cy.get ("[name='submit']").click();
    });
  });
  