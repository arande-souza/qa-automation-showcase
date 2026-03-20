/// <reference types="cypress" />

import auth from "../support/appActions"

describe('Authentication and Home Page - Cypress Real World App', () => {

    beforeEach(() => {
        cy.goToPage()
    })

    it('should login successfully with a random valid user', () => {
        cy.fixture('loginUsers').then((data) => {
            const users = data.users
            const user = users[Math.floor(Math.random() * users.length)]

            auth.loginPage(user)
        })
    })

    it('should display home page elements after successful login', () => {
        cy.fixture('loginUsers').then((data) => {
            const users = data.users
            const user = users[Math.floor(Math.random() * users.length)]
            auth.loginPage(user)

            cy.get('.MuiToolbar-root')
                .should('be.visible')

            cy.get('[data-test="sidenav-user-full-name"]')
                .should('be.visible')
                .and('not.be.empty')
                .and('contain', user.firstName)
        })
    })

})