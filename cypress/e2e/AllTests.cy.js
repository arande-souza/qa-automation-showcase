/// <reference types="cypress" />

import authActions from "../support/appActions"
import userRandom from '../factories/usersFactory.js';

describe('Authentication and Home Page - Cypress Real World App', () => {

    beforeEach(() => {
        cy.goToPage()
    })

    it('should login successfully with a random valid user', () => {
        cy.fixture('loginUsers').then((data) => {
            const users = data.users
            const user = users[Math.floor(Math.random() * users.length)]

            authActions.loginPage(user)
        })
    })

    it('should display home page elements after successful login', () => {
        cy.fixture('loginUsers').then((data) => {
            const users = data.users
            const user = users[Math.floor(Math.random() * users.length)]
            authActions.loginPage(user)

            cy.get('.MuiToolbar-root')
                .should('be.visible')

            cy.get('[data-test="sidenav-user-full-name"]')
                .should('be.visible')
                .and('not.be.empty')
                .and('contain', user.firstName)
        })
    })

    it('should create a new account', () => {

        cy.get('[data-test="signup"]')
            .click()
        authActions.createAccount(userRandom())

    })

    it('should create a new account and login later', () => {
        const user = userRandom();
        
        cy.wrap(user).as('createdUser');
        
        cy.get('[data-test="signup"]')
            .click();
        authActions.createAccount(user);
        
        cy.get('@createdUser').then((createdUser) => {
            cy.log(createdUser.username);
            authActions.loginPage(createdUser)
        });
        
        cy.get('@createdUser').then((createdUser) => {
            authActions.fillBankDetailsForm(createdUser);
        });
        
    });

})