const expect = require('chai').expect;
const app = require('../app');
const request = require('supertest');
const Recipe = require('../models/Recipe');

describe('Receptu route testavimas', () => {
  var url = 'http://localhost:8080';

  it('Tikriname ar GET requestas grazina visus receptus teisingai', async () => {
    const res = await request(url).get('/recipes');

    // console.log(res.body);

    expect(res.status).to.equal(200);
    expect(res.body).to.be.an('array');

    if (res.body.length != 0) {
      expect(res.body[0]).to.have.property('_id');
      expect(res.body[0]).to.have.property('title');
      expect(res.body[0]).to.have.property('description');
      expect(res.body[0]).to.have.property('calories');
      expect(res.body[0]).to.have.property('ingredients');
      expect(res.body[0].ingredients).to.be.an('array');
    }
  });

  it('Tikriniame ar GET requestas pateikiant id grazina viena recepta teisingai', async () => {
    const res = await request(url).get('/recipes/5eb931e143d1180119fe25df');
    expect(res.status).to.equal(200);
    expect(res.body).to.have.property('_id');
    expect(res.body).to.have.property('title');
    expect(res.body).to.have.property('description');
    expect(res.body).to.have.property('calories');
    expect(res.body).to.have.property('ingredients');
    expect(res.body.ingredients).to.be.an('array');
  });

  it('Tikriname ar POST requestas prideda nauja recepta teisingai', async () => {
    const recipe = new Recipe({
      title: 'Malteasers',
      description: 'labai skanus saldainiai',
      calories: 500,
      ingredients: [],
    });

    const res = await request(url).post('/recipes').send(recipe);
    //  console.log(res.body);
    expect(res.status).to.be.equal(200);
    expect(res.body).to.be.not.empty;
  });

  it('Tikriname ar DELETE requestas istrina musu pasirinkta recepta teisingai', async () => {
    const recipe = new Recipe({
      title: 'Malteasers',
      description: 'labai skanus saldainiai',
      calories: 500,
      ingredients: [],
    });

    const resPost = await request(url).post('/recipes').send(recipe);
    // console.log(resPost.body._id);

    const res = await request(url).delete('/recipes/' + resPost.body._id);
    //  console.log(res.body);
    expect(res.status).to.be.equal(200);
    expect(res.body.deletedCount).to.be.equal(1);
  });

  it('Tikriname ar PATCH requestas pakeicia musu recepto pavadinima teisingai', async () => {
    const recipe = new Recipe({
      title: 'Malteasers',
      description: 'labai skanus saldainiai',
      calories: 500,
      ingredients: [],
    });

    const resPost = await request(url).post('/recipes').send(recipe);
    //  console.log(resPost.body._id);

    const res = await request(url)
      .patch('/recipes/' + resPost.body._id)
      .send({ title: 'Rududu' });
    //  console.log(res.body);
    expect(res.status).to.be.equal(200);
    expect(res.body.ok).to.be.equal(1);
  });
});
