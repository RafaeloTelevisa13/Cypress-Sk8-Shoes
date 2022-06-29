import 'cypress-file-upload';
require('cypress-get-table')
describe('Check contract', () => {

  const nameContract = 'Testing';
  const addressContract = 'secret1kj27dkr7x6rrcwkwe9gs3czk77xx5cdsmxrlxt';
  const expected = [{
    "ACTIONS": " Delete  View ",
    "ADDRESS": addressContract,
    "NAME" : nameContract
  }]

  it('Add contract', () => {
    cy.visit('https://cw-playground.netlify.app')
    cy.get('a[href*="/playground"]').click()
    cy.get("button[data-v-1f705f16]").first().should('be.exist');
    cy.contains('Add contract').click()
    cy.get('input[id="contract-name"]').type(nameContract)
    cy.get('input[id="contract-address"]').type(addressContract)
    //Add to files
    cy.get('input[type="file"]').eq(0).attachFile("Testing Contract/handle_msg.json")
    cy.get('input[id="jsonFile"]').eq(1).attachFile("Testing Contract/query_msg.json")
    cy.get('button[ class="sk-bg-black50 sk-border-black50 sk-text-white sk-border-2 sk-w-fit sk-flex sk-items-center sk-justify-center sk-rounded sk-py-2 sk-px-5"]').click()
    //Before to open the contract verify the table not is empty
    cy.get('table').getTable().should(tableData => {
      expect(tableData).to.deep.equal(expected)
    })

    //To open the contract
    cy.get('span[class="underline underline-offset-1"]').first().should('be.exist');
    cy.get('span[class="underline underline-offset-1"]').click()
    //Search into input
    cy.get('input[id="searchMessage"]').type('increment')
    cy.get('img[alt="chevron up"]').eq(0).click();
    cy.get('input[name="increment.author"]').type('testing');
    cy.get('img[alt="chevron up"]').eq(1).click();
    cy.get('input[id="searchQuery"]').type('get')
    
    //Return
     cy.contains('Return').click()
   
  })
    it('Add other contract', () => {      
      setInterval(() => {
        cy.contains(' Delete ').click()
        cy.contains('Add contract').click()
        cy.get('input[id="contract-name"]').type('TestingII')
        cy.get('input[id="contract-address"]').type('testingII')
        //Add to files
        cy.get('input[type="file"]').eq(0).attachFile("v1-nft/handle_msg.json")
        cy.get('input[id="jsonFile"]').eq(1).attachFile("v1-nft/query_msg.json")
        cy.get('button[ class="sk-bg-black50 sk-border-black50 sk-text-white sk-border-2 sk-w-fit sk-flex sk-items-center sk-justify-center sk-rounded sk-py-2 sk-px-5"]').click()      
      }, 3000)
       
    })  

})