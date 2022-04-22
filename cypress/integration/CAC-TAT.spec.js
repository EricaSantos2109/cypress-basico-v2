// <reference types="Cypress" />
import loc from '../support/locators'
import command from '../support/commands'
import { faker } from '@faker-js/faker';

const name = faker.name.firstName();
const lastName = faker.name.lastName();
const lorem = faker.lorem.lines();
const email = faker.internet.email();

describe('Central de Atendimento ao Cliente TAT', () => {

    beforeEach(()=>{
        cy.visit('./src/index.html')
        cy.title('Central de Atendimento ao Cliente TAT')
    })

    it('should fill in the required fields and submit the form', () =>{
        cy.requiredFieldsOK(name, lastName, email, lorem)
        cy.get(loc.BUTTON.SEND_BTN).click()
        cy.get(loc.MESSAGE.SUCCESS).should('be.visible')
    })

    it('should show error message when submit the form with invalid email format  ', () =>{
        cy.requiredFieldsOK(name, lastName, name, lorem)
        cy.get(loc.BUTTON.SEND_BTN).click()
        cy.get(loc.MESSAGE.ERROR).should('be.visible')
    })

    it('should not allow entering invalid phone number ', () =>{
        cy.requiredFieldsOK(name, lastName, name, lorem)
        cy.get(loc.INPUT.PHONE).type(name)
        cy.get(loc.INPUT.PHONE).should('not.have.value', name);
    })
})