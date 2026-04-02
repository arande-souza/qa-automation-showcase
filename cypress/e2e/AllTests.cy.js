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

    it('should create a bank account', () => {

        cy.get('[data-test="signup"]')
            .click()
        authActions.createAccount(userRandom())

    })

    it('should sign up user, login and add bank details', () => {
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


    it('should create a bank account', () => {
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

        cy.get('[data-test="sidenav-bankaccounts"] > .MuiListItemText-root > .MuiTypography-root')
            .contains('Bank Accounts')
            .click();

        cy.get('[data-test="bankaccount-new"]').click();
        cy.get('@createdUser').then((createdUser) => {
            authActions.fillBankDetailsFormSecondAccount(createdUser);
        });
    });

    it('should create and delete the second bank account', () => {
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

        cy.get('[data-test="sidenav-bankaccounts"] > .MuiListItemText-root > .MuiTypography-root')
            .contains('Bank Accounts')
            .click();

        cy.get('[data-test="bankaccount-new"]')
            .click();

        cy.get('@createdUser').then((createdUser) => {
            authActions.fillBankDetailsFormSecondAccount(createdUser);
        });

        cy.get('@createdUser').then((createdUser) => {
            const secondBankName = `${createdUser.firstName} ${createdUser.lastName} 2`;
            const exactBankName = new RegExp(`^${Cypress._.escapeRegExp(secondBankName)}\\s*$`);

            cy.contains('[data-test^="bankaccount-list-item-"] .MuiTypography-root', exactBankName)
                .should('be.visible')
                .parents('[data-test^="bankaccount-list-item-"]')
                .first()
                .within(() => {
                cy.get('[data-test="bankaccount-delete"]')
                .click();
            });

            cy.contains('[data-test^="bankaccount-list-item-"]', secondBankName)
               .should('contain', 'Deleted');
        });


    });

})