
const assert = require('assert')
const should = require('should')
const request = require('supertest')
const app = require('./index')


// mocha 테스트 코드 실행기
// should 검증시 사용하는 모듈 


// 테스트 꾸러미 ( 테스트 환경 )
describe('GET /users', ()=>{

  describe('성공',()=>{

      // 테스트 코드 작성
      it('배열을 반환한다', (done)=>{
        
        // should 검증 모듈
        // (1).should.equal(1)
        
        request(app).get('/users')
          .end((err, res) => {
            // console.log(res.body)
              res.body.should.be.instanceof(Array)
              res.body.forEach(user=>{
                user.should.have.property('name')
              })

            // 테스트가 완료 되었을 때 done 함수 실행
            done()
          })
      })

      it('최대 limit 갯수만큼 응답한다.',done =>{
        request(app)
        .get('/users?limit=2')
        .end((err, res) =>{
          res.body.should.have.lengthOf(2)
          done()
        })
      })
      
  })

  describe('실패', ()=>{
    it('limit이 정수가 아니면 400을 응답한다', done=>{
      request(app)
        .get('/users?limit=two')
        .expect(400)  //상태값만 체크
        .end(done)
    })
  })



})

describe('Get /users/:id',()=>{
  describe('성공',()=>{
    it('유저 객체를 반환한다.', done =>{
      request(app)
        .get('/users/1')
        .end((err,res) =>{
          res.body.should.have.property('id',1)
          done()
        })
    })
  })


})