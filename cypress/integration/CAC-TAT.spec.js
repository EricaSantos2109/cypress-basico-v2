// <reference types="Cypress" />
import loc from '../support/locators'
import '../support/commands'
import { faker } from '@faker-js/faker';

const name = faker.name.firstName();
const lastName = faker.name.lastName();
const lorem = faker.lorem.lines();
const email = faker.internet.email();
const phone = faker.random.number({ min: 1000000, max: 10000000 })

describe('Central de Atendimento ao Cliente TAT', () => {

    beforeEach(() => {
        cy.visit('./src/index.html')
        cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')
    })

    it('should fill in the required fields and submit the form', () => {
        cy.requiredFieldsOK(name, lastName, email, lorem)
        cy.get(loc.BUTTON.SEND_BTN).click()
        cy.get(loc.MESSAGE.SUCCESS).should('be.visible')
    })

    it('should show error message when submit the form with invalid email format  ', () => {
        cy.requiredFieldsOK(name, lastName, name, lorem)
        cy.get(loc.BUTTON.SEND_BTN).click()
        cy.get(loc.MESSAGE.ERROR).should('be.visible')
    })

    it('should not allow entering invalid phone number ', () => {
        cy.requiredFieldsOK(name, lastName, email, lorem)
        cy.get(loc.INPUT.PHONE).type(name)
        cy.get(loc.INPUT.PHONE).should('not.have.value', name);
    })

    it('should fill in and clean the required fields', () => {
        cy.requiredFieldsOK(name, lastName, email, lorem)
        cy.get(loc.INPUT.PHONE).type(phone)
            .should('have.value', phone)
            .clear().should('have.value', '')
        cy.get(loc.INPUT.NAME).should('have.value', name)
            .clear().should('have.value', '')
        cy.get(loc.INPUT.LAST_NAME).should('have.value', lastName)
            .clear().should('have.value', '')
        cy.get(loc.INPUT.EMAIL).should('have.value', email)
            .clear().should('have.value', '')
    })

    it('should show error message when submit the form without fill the required fields', () => {
        cy.get(loc.INPUT.PHONE).type(phone)
        cy.get(loc.BUTTON.SEND_BTN).click()
        cy.get(loc.MESSAGE.ERROR).should('be.visible')
    })

    it('should select a random option from a select dropdown product', () => {
        function getRandomInt(min, max){      
            return Math.floor(Math.random() * (max - min + 1)) + min;    
          } 
          cy.get('#product>option') // we get the select/option by finding the select by id
          .then(listing => {        
            const randomNumber = getRandomInt(0, listing.length-1); //generate a random number between 0 and length-1
            cy.get('#product>option').eq(randomNumber).then(($select) => { //choose an option randomly
              const text = $select.text() //get the option's text
              cy.get('#product').select(text) // select the option on UI
            });    
          })
    })
})