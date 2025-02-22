describe("Home Admin", () => {
    beforeEach(() => {
        cy.visit("http://localhost:3000", {
            onBeforeLoad(win) {
                
                win.document.cookie = 'refresh_token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOi8vYXBpLXBlbnlld2Fhbi5hcmFuODI3Ni5zaXRlL2FwaS9sb2dpbiIsImlhdCI6MTczOTk5ODQwMiwiZXhwIjoxNzQwMDEyODAyLCJuYmYiOjE3Mzk5OTg0MDIsImp0aSI6ImFENVJENHdHVW1UbGVScnkiLCJzdWIiOiIyIiwicHJ2IjoiMjNiZDVjODk0OWY2MDBhZGIzOWU3MDFjNDAwODcyZGI3YTU5NzZmNyJ9.B_L5s-qvZUMrER3bQwpgNKx3cZG9rxrf65BHxa4CTuk; domain=localhost; path=/';
            }
        });
    });
    it("Otomatis klik tombol Rent Now untuk Levono ThinkPad", () => {
        cy.visit("http://localhost:3000/admin/alat");
        cy.get("#conten2").scrollIntoView();
        cy.get("a[aria-label='Rent Laptop Levono ThinkPad']").click({force: true});
        cy.url().should("include", "/admin/pelanggan"); // Pastikan URL berubah ke halaman pelanggan
    });
});