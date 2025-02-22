describe("Page Kategori", () => {
    it("Halaman Kategori", () => {
      cy.visit("http://localhost:3000/admin/kategori");
      cy.get ("[name='tambahkat']").click();
      cy.url().should("include", "/admin/kategori/tambah");
      cy.get ("[name='namakat']").type("Televisi");
    });
  });
  