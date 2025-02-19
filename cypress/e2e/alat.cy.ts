describe("Page Alat", () => {
    it("Halaman Alat", () => {
      cy.visit("http://localhost:3000/admin/alat");
      cy.get ("[name='tambahalt']").click();
      cy.url().should("include", "/admin/alat/tambah");
      cy.get ("[name='alat_nama']").type("Kipas Wadesta");
      cy.get ("[name='alat_deskripsi']").type("kipas dengan daya listrik rendah");
      cy.get ("[name='alat_hargaPerhari']").type("20000");
      cy.get ("[name='alat_stok']").type("4");
    });
  });
  