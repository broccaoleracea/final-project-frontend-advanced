describe("Home Login", () => {
    it("Halaman Login", () => {
      cy.visit("http://localhost:3000/auth/login");
      cy.wait(2000);
      cy.get ("[name='email']").type("Rafa@gmail.com");
      cy.get ("[name='password']").type("rafa123");
      cy.get ("[name='submit']").click();
      cy.wait(4000);
      cy.visit("http://localhost:3000/admin/alat");
      cy.wait(3000);
      cy.visit("http://localhost:3000/admin/alat/tambah");
      cy.get ("[name='alat_nama']").type("Laptop ASUS VivoBook");
      cy.get ("[name='alat_deskripsi']").type("Laptop Sangat Bagus Ram HIngga 512 TB");
      cy.get("[name='alat_hargaPerhari']").clear();
      cy.get ("[name='alat_hargaPerhari']").type("700000");
      cy.get("[name='alat_stok']").clear();
      cy.get ("[name='alat_stok']").type("8");
      cy.get('#alat_kategori_id').should('be.visible');
      cy.get('#alat_kategori_id').select('13');
      cy.get ("[name='tambah']").click();
      cy.wait(5000);
      cy.get('#update')
      .first() 
      .click();
      cy.wait(5000);
      cy.get("[name='alat_nama']").clear();
      cy.get ("[name='alat_nama']").type("TV besar");
      cy.get("[name='alat_deskripsi']").clear();
      cy.get ("[name='alat_deskripsi']").type("TV yang Sangat Bagus Ram HIngga 512 TB");
      cy.get("[name='alat_hargaPerhari']").clear();
      cy.get ("[name='alat_hargaPerhari']").type("900000");
      cy.get("[name='alat_stok']").clear();
      cy.get ("[name='alat_stok']").type("3");
      cy.get("[name='alat_kategori_id']").select('15');
      cy.get ("[name='update']").click();
      cy.get(".px-3.py-1.bg-red-500.text-white.rounded-md.hover\\:bg-red-600.focus\\:ring-2.focus\\:ring-red-400.text-sm")
      .first() 
      .click();
      cy.get("button")
      .contains("Delete") // Temukan tombol dengan teks "Delete"
      .click();
      cy.wait(5000);
      cy.visit("http://localhost:3000/admin/kategori");
      cy.wait(3000);
      cy.visit("http://localhost:3000/admin/kategori/tambah");
      cy.get("[name='kategoriNama']").type("Kabel");
      cy.get ('#submit').click();
      cy.get('')
      .first() 
      .click();
      cy.get("button")
      .contains("Delete") // Temukan tombol dengan teks "Delete"
      .click();

    });
  });
  