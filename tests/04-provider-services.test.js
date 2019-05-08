import {describe} from "mocha";

process.env.NODE_ENV = 'test'

const chai = require('chai')
const should = require('chai').should()
const chaiHttp = require('chai-http')
chai.use(chaiHttp)

const server = require('../index')
const db_provider = require('../models/provider')


// Provider's services

describe('provider services', function() {

    it('should update general settings', function(done) {

    })

    it('should update booking type', function(done) {

    })

    it("should create a new service", function(done) {

    })

    it("should get all services a provider has added", function(done) {

    })

    it("should update service", function(done) {

    })

    it("should update service to archived", function(done) {

    })




})