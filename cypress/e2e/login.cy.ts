describe("Home Login", () => {
    it("Halaman Login", () => {
      cy.visit("http://localhost:3000/auth/login");
      cy.wait(2000);
      cy.get ("[name='email']").type("Rafa@gmail.com");
      cy.get ("[name='password']").type("rafa123");
      cy.wait(2000);
      cy.get ("[name='submit']").click();
      cy.wait(2000);
      cy.visit("http://localhost:3000/admin/alat");
      cy.wait(3000);
      cy.visit("http://localhost:3000/admin/alat/tambah");
      cy.get ("[name='alat_nama']").type("Laptop ASUS VivoBook");
      cy.get ("[name='alat_deskripsi']").type("Laptop Sangat Bagus Ram HIngga 512 TB");
      cy.get ("[name='alat_hargaPerhari']").type("700000");






    });
  });
  