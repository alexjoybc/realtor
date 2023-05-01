"use client";

import { useState } from 'react'
import { LineChart, Line, Legend, CartesianGrid, XAxis, YAxis, ResponsiveContainer } from 'recharts';

export default function Home() {


  const [config, setConfig] = useState(
    {
      principal: 80000,
      amortization: 10,
      rate: 5
    });
  const [paymentPerPeriod, setPaymentPerPeriod] = useState(0);
  const [paymentSchedule, setPaymentSchedule] = useState([]);

  const handlePrincipalChange = (e) => {
    if (!isNaN(e.target.value)) {
      setConfig(config => ({
        ...config,
        principal: Number(e.target.value)
      }));
      createPaymentSchedule(Number(e.target.value), Number(config.rate), Number(config.amortization));
    }
  };

  const handleAmortizationChange = (e) => {
    if (!isNaN(e.target.value)) {
      setConfig(config => ({
        ...config,
        amortization: Number(e.target.value)
      }));
      createPaymentSchedule(Number(config.principal), Number(config.rate), Number(e.target.value));
    }
  }

  const handleRateChange = (e) => {
    if (!isNaN(e.target.value)) {
      setConfig(config => ({
        ...config,
        rate: Number(e.target.value)
      }));
      createPaymentSchedule(Number(config.principal), Number(e.target.value), Number(config.amortization));
    }
  }

  const createPaymentSchedule = (principal, interest, amortization) => {

    let monthLength = amortization * 12;
    let periodInterest = interest / 100 / 12;
    let monthlyPayment = calculateMonthlyPayments(principal, periodInterest, monthLength)

    setPaymentPerPeriod(monthlyPayment);
    setPaymentSchedule(generatePaymentSchedule(principal, monthLength, monthlyPayment, periodInterest));
  }

  const generatePaymentSchedule = (principal, length, monthlyPayment, periodInterest) => {

    const map = [];
    const date = new Date();
    let remaining = monthlyPayment * length;



    for (let i = 0; i < length; i++) {

      let interest = principal * periodInterest;
      principal = principal - interest;
      remaining = remaining - monthlyPayment;

      map.push({
        "date": new Date(date.setMonth(date.getMonth() + i)),
        "value": monthlyPayment,
        "remaining": Math.round(remaining * 100) / 100,
        "interest": Math.round(interest * 100) / 100
      });

    }

    return map;
  }

  const calculateMonthlyPayments = (amount, periodInterest, totalMonth) => {
    // forumla M = P [ i(1 + i)^n ] / [ (1 + i)^n – 1]
    // M = Total monthly payment
    // P = The total amount of your loan
    // I = Your interest rate, as a monthly percentage
    // N = The total amount of months in your timeline for paying off your mortgage
    let firstPart = periodInterest * Math.pow((1 + periodInterest), totalMonth);
    let secondPart = Math.pow((1 + periodInterest), totalMonth) - 1;

    return Math.round(amount * (firstPart / secondPart) * 100) / 100;

  }

  const data = [
    { name: 'Page A', uv: 400, pv: 2400, amt: 2400 },
    { name: 'Page B', uv: 322, pv: 2400, amt: 2400 },
    { name: 'Page C', uv: 43, pv: 2400, amt: 2400 },
    { name: 'Page D', uv: 123, pv: 2400, amt: 2400 }];

  return (
    <>
      <header className="bg-white shadow">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">Mortgage Calculator</h1>
        </div>
      </header>
      <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
        <div className="mt-10 mx-2 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-3">
          <div>
            <label htmlFor="amount" className="block text-sm font-medium leading-6 text-gray-900">
              amount
            </label>
            <div className="relative mt-2 rounded-md shadow-sm">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <span className="text-gray-500 sm:text-sm">$</span>
              </div>
              <input
                type="text"
                value={config.principal}
                name="amount"
                id="amount"
                className="block w-full rounded-md border-0 py-1.5 pl-7 pr-12 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                placeholder="0.00"
                aria-describedby="amount-currency"
                onChange={handlePrincipalChange}
              />
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                <span className="text-gray-500 sm:text-sm" id="amount-currency">
                  CAD
                </span>
              </div>
            </div>
          </div>
          <div>
            <label htmlFor="amortization" className="block text-sm font-medium leading-6 text-gray-900">
              amortization
            </label>
            <div className="relative mt-2 rounded-md shadow-sm">
              <input
                type="text"
                value={config.amortization}
                name="amortization"
                id="amortization"
                className="block w-full rounded-md border-0 py-1.5 pl-2 pr-12 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                placeholder="0.00"
                aria-describedby="amount-currency"
                onChange={handleAmortizationChange}
              />
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                <span className="text-gray-500 sm:text-sm" id="amount-currency">
                  Years
                </span>
              </div>
            </div>
          </div>
          {/* <div>
                <label htmlFor="term" className="block text-sm font-medium leading-6 text-gray-900">
                  term
                </label>
                <div className="relative mt-2 rounded-md shadow-sm">
                  <input
                    type="text"
                    value={term}
                    name="term"
                    id="term"
                    className="block w-full rounded-md border-0 py-1.5 pl-2 pr-12 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    placeholder="0"
                    onChange={handleTermChange}
                  />
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                    <span className="text-gray-500 sm:text-sm" id="amount-currency">
                      Years
                    </span>
                  </div>
                </div>
              </div>
              <div>
                <label htmlFor="amount" className="block text-sm font-medium leading-6 text-gray-900">
                  Payment type
                </label>
                <div className="relative mt-2 rounded-md shadow-sm">
                  <select
                    id="country"
                    name="country"
                    autoComplete="country-name"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                  >
                    <option value="0">Weekly</option>
                    <option value="1">Accelerated weekly</option>
                    <option value="2">Accelerated bi-weekly</option>
                    <option value="3">Bi-weekly</option>
                    <option value="4">Semi-monthly</option>
                    <option value="5" selected="selected">Monthly</option>
                  </select>
                </div>
              </div> */}
          <div>
            <label htmlFor="rate" className="block text-sm font-medium leading-6 text-gray-900">
              Interest Rates
            </label>
            <div className="relative mt-2 rounded-md shadow-sm">
              <input
                type="text"
                value={config.rate}
                name="rate"
                id="rate"
                className="block w-full rounded-md border-0 py-1.5 pl-2 pr-12 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                placeholder="0"
                onChange={handleRateChange}
              />
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                <span className="text-gray-500 sm:text-sm" id="amount-currency">
                  %
                </span>
              </div>
            </div>
          </div>
        </div>
        <span>Monthly Payment: {paymentPerPeriod}</span>
        <br />
        {/* <span>{JSON.stringify(config)}</span> */}

        {/* <span>{JSON.stringify(paymentSchedule)}</span> */}
        <div className="mt-10 mx-2 grid grid-cols-1">
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={paymentSchedule}>
              <Line yAxisId="right" type="monotone" dataKey="interest" stroke="#8884d8" dot={false} />
              <Line yAxisId="left" type="monotone" dataKey="remaining" stroke="#d1d1d1" dot={false} />
              <CartesianGrid stroke="#ccc" strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="date" />
              <YAxis yAxisId="left" />
              <YAxis yAxisId="right" orientation="right" />
              <Legend />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </>
  )
}
