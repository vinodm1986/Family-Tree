var chai = require('chai');
var expect = chai.expect;
var sinon = require('sinon');
var sinonChai = require('sinon-chai');
var Q = require("q");
chai.use(sinonChai);

var controller = require('../../app/controllers/member-controller');
var model = require('../../app/models/member');
var req = {},res = {},next = {};
var jsonSpy = {},errorSpy = {};

beforeEach(function () {
    res = {
        json: sinon.spy(),
        send: sinon.spy()
    };
    jsonSpy = sinon.spy(controller,'sendJsonResponse');
    errorSpy = sinon.spy(controller,'sendErrorResponse');
});
  
afterEach(function () {
    res.send.reset();
    jsonSpy.restore();
    errorSpy.restore();
});

describe('Get all members',function(){
    var modelStub = {};
    
    beforeEach(function () {
        modelStub = sinon.stub(model,'fetchAllMembers');
    });
    
    afterEach(function () {           
        modelStub.restore();        
    });
    
    it('successfully returns all members',function(done){
        const response = [{name:'member1'},{name:'member2'}];
        modelStub.returns(Q.resolve(response));
        controller.getAllMembers(req,res,next);    
        process.nextTick(function(){
           expect(res.json).to.have.been.calledWith(response);
           expect(modelStub).to.have.callCount(1); 
           done();  
        });
    });
    it('fails when model throws an error', function(done){
       var err = {message: "failed to get response"};
       modelStub.throws(err);
       controller.getAllMembers(req,res,next);
       process.nextTick(function(){
           expect(res.send).to.have.been.calledWith(err);  
           expect(modelStub).to.have.callCount(1);     
           done();  
        });  
    });
    it('fails when model returns an error response from the db',function(){
        const response = {message:'failed to fetch from db'};
        modelStub.returns(Q.resolve(response));
        controller.getAllMembers(req,res,next);    
        process.nextTick(function(){
           expect(res.json).to.have.been.calledWith(response);     
           expect(modelStub).to.have.callCount(1);    
           done();  
        });
    });
});

describe('Get a single member by ID',function(){
    var modelStub = {},id= 10;
    
    beforeEach(function () {
        req = {
            params:{id:id}
        };
        modelStub = sinon.stub(model,'fetchMemberById');
    });
    
    afterEach(function () {           
        modelStub.restore();        
    });
    
    it('successfully returns all members',function(done){
        const response = {name:'member1'};
        modelStub.returns(Q.resolve(response));
        controller.getMemberById(req,res,next);    
        process.nextTick(function(){
           expect(res.json).to.have.been.calledWith(response); 
           expect(modelStub).to.have.callCount(1);   
           done();  
        });
    });
    it('fails when model throws an error', function(done){
       var err = {message: "failed to get response"};
       modelStub.throws(err);
       controller.getMemberById(req,res,next);
       process.nextTick(function(){
           expect(res.send).to.have.been.calledWith(err);  
           expect(modelStub).to.have.callCount(1); 
           done();  
        });  
    });
    it('fails when model returns an error response from the db',function(){
        const response = {message:'failed to fetch from db'};
        modelStub.returns(Q.resolve(response));
        controller.getMemberById(req,res,next);    
        process.nextTick(function(){
           expect(res.json).to.have.been.calledWith(response);     
           expect(modelStub).to.have.callCount(1);    
           done();  
        });
    });
});

describe('Get members by first and last name',function(){
    var modelStub = {},firstName= "first",lastName = "last";
    
    beforeEach(function () {
        req = {
            params:{firstName:firstName,lastName:lastName}
        };
        modelStub = sinon.stub(model,'filterMembers');
    });
    
    afterEach(function () {           
        modelStub.restore();        
    });
    
    it('successfully returns all members',function(done){
        const response = [{name:'member1'},{name:'member2'}];
        modelStub.returns(Q.resolve(response));
        controller.getMemberByName(req,res,next);    
        process.nextTick(function(){
           expect(res.json).to.have.been.calledWith(response); 
           expect(modelStub).to.have.callCount(1);   
           done();  
        });
    });
    it('fails when model throws an error', function(done){
       var err = {message: "failed to get response"};
       modelStub.throws(err);
       controller.getMemberByName(req,res,next);
       process.nextTick(function(){
           expect(res.send).to.have.been.calledWith(err);  
           expect(modelStub).to.have.callCount(1); 
           done();  
        });  
    });
    it('fails when model returns an error response from the db',function(){
        const response = {message:'failed to fetch from db'};
        modelStub.returns(Q.resolve(response));
        controller.getMemberByName(req,res,next);    
        process.nextTick(function(){
           expect(res.json).to.have.been.calledWith(response);     
           expect(modelStub).to.have.callCount(1);    
           done();  
        });
    });
});