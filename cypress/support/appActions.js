class authActions {

    loginPage(user) {
        cy.get('[name="username"]').should('be.visible')
        cy.get('[name="username"]').type(user.username)
        cy.get('[name="password"]').type(user.password, { log: false })
        cy.get('[data-test="signin-submit"]').click()
    }

    createAccount(userRandom) {
        cy.get('[name="firstName"]').type(userRandom.firstName)
        cy.get('[name="lastName"]').type(userRandom.lastName)
        cy.get('[name="username"]').type(userRandom.username)
        cy.get('[name="password"]').type(userRandom.password, { log: false })
        cy.get('[name="confirmPassword"]').type(userRandom.password, { log: false })
        cy.get('[data-test="signup-submit"]').click()
    }

    fillBankDetailsForm(createdUser){
          cy.get('[data-test="user-onboarding-next"]')
                .click();
            cy.get('[name="bankName"]')
                .type(`${createdUser.firstName} ${createdUser.lastName}`)
            cy.get('[name="routingNumber"]')
                .type(createdUser.routingNumber)
            cy.get('[name="accountNumber"]').
                type(createdUser.accountNumber)
            cy.get('[data-test="bankaccount-submit"]')
                .click();
            cy.get('[data-test="user-onboarding-next"]')
                .click();
    }


}
export default new authActions();