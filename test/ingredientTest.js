const expect = require('chai').expect;
const app = require('../app');
const request = require('supertest');
const Ingredient = require('../models/Ingredient');

describe('Ingridientu route testavimas', () => {
  var url = 'http://localhost:8080';

  it('Tikriname ar GET requestas grazina teisingas reiksmes', async () => {
    const res = await request(url).get('/ingredients');

    // console.log(res.body);

    expect(res.status).to.equal(200);
    expect(res.body).to.be.an('array');

    if (res.body.length != 0) {
      expect(res.body[0]).to.have.property('_id');
      expect(res.body[0]).to.have.property('title');
      expect(res.body[0]).to.have.property('description');
      expect(res.body[0]).to.have.property('calories');
    }
  });

  it('Tikriniame ar GET requestas pateikiant id grazina viena ingredienta teisingai', async () => {
    const res = await request(url).get('/ingredients/5e9c8b1070fb5e022601e411');
    expect(res.status).to.equal(200);
    expect(res.body).to.have.property('_id');
    expect(res.body).to.have.property('title');
    expect(res.body).to.have.property('description');
    expect(res.body).to.have.property('calories');
  });

  it('Tikriname ar POST requestas prideda nauja ingredienta teisingai', async () => {
    const ingredient = new Ingredient({
      title: 'saldainiukas',
      description: 'labai skanus',
      calories: 50,
    });

    const res = await request(url).post('/ingredients').send(ingredient);
    //  console.log(res.body);
    expect(res.status).to.be.equal(200);
    expect(res.body).to.be.not.empty;
  });

  it('Tikriname ar DELETE requestas istrina musu pasirinkta ingredienta teisingai', async () => {
    const ingredient = new Ingredient({
      title: 'saldainiukas',
      description: 'labai skanus',
      calories: 50,
    });

    const resPost = await request(url).post('/ingredients').send(ingredient);
    // console.log(resPost.body._id);

    const res = await request(url).delete('/ingredients/' + resPost.body._id);
    //  console.log(res.body);
    expect(res.status).to.be.equal(200);
    expect(res.body.deletedCount).to.be.equal(1);
  });

  it('Tikriname ar PATCH requestas pakeicia musu ingrediento pavadinima teisingai', async () => {
    const ingredient = new Ingredient({
      title: 'saldainiukas',
      description: 'labai skanus',
      calories: 50,
    });

    const resPost = await request(url).post('/ingredients').send(ingredient);
    //  console.log(resPost.body._id);

    const res = await request(url)
      .patch('/ingredients/' + resPost.body._id)
      .send({ title: 'Rududu' });
    //  console.log(res.body);
    expect(res.status).to.be.equal(200);
    expect(res.body.ok).to.be.equal(1);
  });
});
