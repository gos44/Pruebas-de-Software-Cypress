describe('Functional Tests - Test Functionality Center', () => {
  
    beforeEach(() => {
      // Cargar la página HTML directamente desde un archivo local o servidor
      cy.visit('http://127.0.0.1:5500/preubas_cy/Prueba.html'); // Reemplaza con la URL correcta
    });
  
    it('User Interaction: Verify "Add to Cart" button functionality', () => {
      cy.get('#addToCartBtn').click(); // Clic en el botón
      cy.get('#interactionResult').should('contain.text', 'Product added to cart successfully.'); // Verificar el resultado
      cy.get('#logEntries li').last().should('contain.text', 'Add to Cart button clicked - Product added.');
    });
  
    it('Navigation: Verify navigation links functionality', () => {
      cy.get('.test-navigation a').eq(0).should('have.text', 'Home'); // Verificar primer enlace
      cy.get('.test-navigation a').eq(1).should('have.text', 'Products'); // Verificar segundo enlace
      cy.get('.test-navigation a').eq(2).should('have.text', 'SQUARE'); // Verificar tercer enlace
    });
  
    it('Search: Verify search bar functionality', () => {
      const searchTerm = 'SQUARE';
      cy.get('#searchBar').type(searchTerm); // Escribir el término de búsqueda
      cy.get('#searchBtn').click(); // Clic en el botón de búsqueda
      cy.get('#searchResult').should('contain.text', `Search results for "${searchTerm}" displayed.`); // Verificar el resultado
      cy.get('#logEntries li').last().should('contain.text', `Search button clicked - Results for "${searchTerm}" displayed.`);
    });
  
    it('Reset Button: Reset tests functionality', () => {
      // Realizar acciones antes del reset
      cy.get('#addToCartBtn').click();
      cy.get('#searchBar').type('SQUARE');
      cy.get('#searchBtn').click();
      
      // Resetear
      cy.get('#resetBtn').click();
      
      // Verificar que todos los resultados se han reseteado
      cy.get('#interactionResult').should('contain.text', 'Result will appear here.');
      cy.get('#navigationResult').should('contain.text', 'Navigation result will appear here.');
      cy.get('#searchResult').should('contain.text', 'Search result will appear here.');
      cy.get('#logEntries li').should('not.exist');
    });
  });
  