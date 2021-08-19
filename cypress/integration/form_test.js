describe('User Onboarding App', () => {
    beforeEach(() => {
        cy.visit(' http://localhost:3000')
    })

    const nameInput = () => cy.get('input[name=name')
    const emailInput = () => cy.get('input[name=email]')
    const passwordInput = () => cy.get('input[name=password')
    const termsCheckbox = () => cy.get('input[name=terms')
    const submitBtn = () => cy.get('button[id="submitBtn')

    it('Sanity check to make sure that tests work', () => {
        expect(1 + 2).to.equal(3)
        expect(2 + 2).not.to.equal(5)
        expect({}).not.to.equal({}) 
        expect({}).to.eql({}) 
    })

    it('The proper elements are showing', () => {
        nameInput().should('exist')
        emailInput().should('exist')
        passwordInput().should('exist')
        termsCheckbox().should('exist')
        submitBtn().should('exist')

        cy.contains('User Onboarding App').should('exist')
    })

    describe('Filling out the inputs', () => {
        it('Can navigate to the site', () => {
            cy.url().should('include', 'localhost')
        })
        it('Submit button starts out disabled', () => {
            submitBtn().should('be.disabled')
        })
        it('Can type in the inputs', () => {
            nameInput()
                .should('have.value', '')
                .type('Kennedy Bryant')
                .should('have.value', 'Kennedy Bryant')
            
            emailInput()
                .should('have.value', '')
                .type('kennedy@bryant.com')
                .should('have.value', 'kennedy@bryant.com')

            passwordInput()
                .should('have.value', '')
                .type('1234')
                .should('have.value', '1234')
        })
       it('Can check Terms of Service box', () => {
           termsCheckbox().click()
       })
    })

    describe('User can submit form data', () => {
        it('Can submit after all inputs are filled', () => {
            nameInput()
                .should('have.value', '')
                .type('Kennedy Bryant')
                .should('have.value', 'Kennedy Bryant')
            
            emailInput()
                .should('have.value', '')
                .type('kennedy@bryant.com')
                .should('have.value', 'kennedy@bryant.com')

            passwordInput()
                .should('have.value', '')
                .type('1234')
                .should('have.value', '1234')

            termsCheckbox().click()

            submitBtn().should('not.be.disabled').click()
        })
        it('Cannot submit if all inputs are not filled', () => {
            nameInput()
                .should('have.value', '')
            
            emailInput()
                .should('have.value', '')
                .type('kennedy@bryant.com')
                .should('have.value', 'kennedy@bryant.com')

            passwordInput()
                .should('have.value', '')
                .type('1234')
                .should('have.value', '1234')

            termsCheckbox().click()

            submitBtn().should('be.disabled')
        })
    })
}) 