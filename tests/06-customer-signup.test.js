import {describe} from "mocha";

process.env.NODE_ENV = 'test'


const chai = require('chai')
const should = require('chai').should()
const chaiHttp = require('chai-http')
chai.use(chaiHttp)

const server = require('../index')
const db_user = require('../models/user')



describe('widget signup', function() {
    
    it('should create a new customer', function(done) {
        // chai.request(server).post('/api/customers/signup')
		// 	.send({
        //         firstname: 'Mark',
        //         lastname: 'Ronson',
		// 		email: 'mark@email.com',
		// 		password: '123123'
		// 	})
		// 	.end(function(err, res) {
		// 		if (err) {
		// 			console.log('ERR', err);
		// 		}
		// 		console.log('RES BODY', res.body);
		// 		res.body.email.should.equal('mark@email.com')
		// 		done()
		// 	})
    })
    it('should not create a new user with the same email', function(done) {

    })
    it('should not create a new user without password', function(done) {

    })
    it('should not create a new user without name', function(done) {

    })
})