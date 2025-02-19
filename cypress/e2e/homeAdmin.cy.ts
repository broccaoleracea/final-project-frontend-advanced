describe("Home Admin", () => {
  it("Otomatis klik tombol Rent Now untuk Levono ThinkPad", () => {
    // Kunjungi halaman admin alat
    cy.visit("http://localhost:3000/admin/alat");
    cy.get("#conten2").scrollIntoView();
    cy.get("a[aria-label='Rent Laptop Levono ThinkPad']").click({ force: true }); 
    cy.url().should("include", "/admin/pelanggan"); // Pastikan URL berubah ke halaman pelanggan
  });
});