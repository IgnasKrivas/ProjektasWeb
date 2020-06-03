import React, { useState } from 'react';

export default function Calculator() {
  const [age, setAge] = useState();
  const [height, setHeight] = useState();
  const [weight, setWeight] = useState();
  const [activity, setActivity] = useState(1.2);
  const [typeMale, setTypeMale] = useState(true);
  const [TDEE, setTDEE] = useState({
    bmr: 0,
    value: 0,
    isSubmitted: false,
  });

  const calculate = (event) => {
    event.preventDefault();

    if (typeMale) {
      setTDEE({
        isSubmitted: true,
        bmr: 66 + 13.7 * weight + 5 * height - 6.8 * age,
        tdee: (66 + 13.7 * weight + 5 * height - 6.8 * age) * activity,
      });
    } else {
      setTDEE({
        isSubmitted: true,
        bmr: 655 + 9.6 * weight + 1.8 * height - 4.7 * age,
        tdee: (655 + 9.6 * weight + 1.8 * height - 4.7 * age) * activity,
      });
    }
  };

  return (
    <>
      <h3>Įveskite reikiamus duomenis.</h3>
      <div>Skaičiavimams pasitelkiama Harris-Benedict formulė</div>
      <hr />
      <form onSubmit={calculate}>
        <div>
          <label>Lytis: </label>
          <select
            className="form-control"
            value={typeMale}
            onChange={(event) => setTypeMale(event.target.value)}
            type="boolean"
          >
            <option value="true">Vyras</option>
            <option value="false">Moteris</option>
          </select>
        </div>
        <div className="form-group">
          <label>Amžius: </label>
          <input
            type="number"
            required
            className="form-control"
            onChange={(event) => setAge(event.target.value)}
            value={age}
          />
        </div>
        <div className="form-group">
          <label>Aukštis (centimetrais): </label>
          <input
            type="number"
            required
            className="form-control"
            onChange={(event) => setHeight(event.target.value)}
            value={height}
          />
        </div>
        <div className="form-group">
          <label>Svoris (kilogramais): </label>
          <input
            type="number"
            required
            className="form-control"
            onChange={(event) => setWeight(event.target.value)}
            value={weight}
          />
        </div>
        <div>
          <label>Aktyvumo lygis: </label>
          <select
            className="form-control"
            value={activity}
            onChange={(event) => setActivity(event.target.value)}
            type="number"
          >
            <option value="1.2">Neaktyvus</option>
            <option value="1.375">Lengvai Aktyvus</option>
            <option value="1.55">Aktyvus</option>
            <option value="1.725">Stipriai Aktyvus</option>
            <option value="1.9">Atletas</option>
          </select>
        </div>
        <hr />
        <div className="form-group">
          <input type="submit" value="skaiciuoti" className="btn btn-success" />
        </div>
      </form>
      <div style={{ display: TDEE.isSubmitted ? 'block' : 'none' }}>
        Rezultatai: <div>Jūsų BMR yra lygūs: {TDEE.bmr}</div>
        <div>
          Jūsų TDEE yra lygųs:
          {TDEE.tdee}
        </div>
      </div>
    </>
  );
}
