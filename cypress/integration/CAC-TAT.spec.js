// <reference types="Cypress" />

describe('Central de Atendimento ao Cliente TAT', () => {
    it('Verifica o título da aplicação', () => {
        cy.visit('./src/index.html')
        cy.title('Central de Atendimento ao Cliente TAT')
    })
})