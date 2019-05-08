process.env.NODE_ENV = 'test'

const chai = require('chai')
const should = require('chai').should()
const chaiHttp = require('chai-http')
chai.use(chaiHttp)

const server = require('../index')
const db_user = require('../models/user')



describe('widget', function() {

    //service

    it('should see all the provider services', function(done) {
        
    })
    it('should select a service', function(done) {
        
    })
    it('should select a day', function(done) {

    })
    it('should select a time', function(done) {

    })

    // signup 

    it('should create a new user', function(done) {

    })
    it('should not create a new user with the same email', function(done) {

    })
    it('should not create a new user without password', function(done) {

    })
    it('should not create a new user without name', function(done) {

    })


    // it('should not create a new user with invalid email', function(done) {

    // })



    // login 
    
    it('should not authenticate with wrong email', function(done) {

    })
    it('should not authenticate with wrong password', function(done) {

    })

    // user

    it('should update card info', function(done) {

    })
    it('should update email', function(done) {

    })
    it('should update password', function(done) {

    })

    it('should update name', function(done) {

    })

    // book 

    it('should book service', function(done) {

    })
    it('should not book service without balance on credit card', function(done) {

    })
    it('should not book service with invalid credit card', function(done) {

    })
    it('should not book service with empty field', function(done) {

    })

})
