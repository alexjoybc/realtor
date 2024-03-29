"use client";

import { useState, useEffect } from 'react'
import { LineChart, Line, Legend, CartesianGrid, XAxis, YAxis, ResponsiveContainer, Tooltip } from 'recharts';
import FinanceCard from '@/components/finance-card';
import NumberInput from '@/components/number-input';
import Dropdown from '@/components/dropdown';

export default function Home() {

  const paymentOptions = [
    { value: 0, label: "Monthly" }
  ]

  const [config, setConfig] = useState(
    {
      principal: 80000,
      amortization: 10,
      rate: 5,
      paymentType: 0
    });

  const [mortgageStat, setMortgageStat] = useState([]);
  const [paymentSchedule, setPaymentSchedule] = useState([]);

  const handlePrincipalChange = (e) => {
    if (!isNaN(e.target.value)) {
      setConfig(config => ({
        ...config,
        principal: Number(e.target.value)
      }));
    }
  };

  const handleAmortizationChange = (e) => {
    if (!isNaN(e.target.value)) {
      setConfig(config => ({
        ...config,
        amortization: Number(e.target.value)
      }));
    }
  }

  const handleRateChange = (e) => {

    if (!isNaN(e.target.value)) {
      setConfig(config => ({
        ...config,
        rate: Number(e.target.value)
      }));
    }
  }

  const handlePaymentOptionChange = (e) => {
    setConfig(config => ({
      ...config,
      paymentType: Number(e.target.value)
    }))
  }

  const createPaymentSchedule = (config) => {

    let length = config.amortization * 12;
    let periodInterest = config.rate / 100 / 12;
    let monthlyPayment = calculateMonthlyPayments(config.principal, periodInterest, length);
    setPaymentSchedule(generatePaymentSchedule(config, length, periodInterest, monthlyPayment));

  }

  const generatePaymentSchedule = (config, length, periodInterest, monthlyPayment) => {

    let mortgageStat = [];
    mortgageStat.push({ name: "payments", value: monthlyPayment });

    const map = [];
    const date = new Date();
    let interestPaid = 0;
    let principalPaid = 0;
    let paid = 0;
    let leftToPay = config.principal;

    console.log(date);

    for (let i = 0; i < length; i++) {

      let interest = leftToPay * periodInterest;
      interestPaid += interest;

      principalPaid = principalPaid + (monthlyPayment - interest);

      leftToPay = leftToPay - (monthlyPayment - interest);

      paid = paid + monthlyPayment;

      map.push({
        "date": date,
        "value": monthlyPayment,
        "paid": Math.round(paid * 100) / 100,
        "interestPaid": Math.round(interestPaid * 100) / 100,
        "principalPaid": Math.round(principalPaid * 100) / 100
      });

      date.setMonth(date.getMonth() + 1);

    }

    mortgageStat.push({ name: "interests", value: interestPaid });
    let totalCost = interestPaid + config.principal;
    mortgageStat.push({ name: "total cost", value: totalCost });
    setMortgageStat(mortgageStat);

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

  useEffect(() => {
    createPaymentSchedule(config);
  }, [config]);

  return (
    <>
      <header className="bg-white shadow">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">Mortgage Calculator</h1>
        </div>
      </header>
      <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
        <div className="mx-2 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-2 md:grid-cols-4">

          <NumberInput
            name={"amount"}
            label={"amount"}
            step={1000}
            value={config.principal}
            leftLabel={"$"}
            rightLabel={"CAD"}
            onValueChange={handlePrincipalChange}
          />

          <NumberInput
            name={"amortization"}
            label={"amortization"}
            step={5}
            value={config.amortization}
            rightLabel={"Years"}
            onValueChange={handleAmortizationChange} />

          <NumberInput
            name={"rate"}
            label={"rate"}
            step={0.1}
            value={config.rate}
            rightLabel={"%"}
            onValueChange={handleRateChange} />

          <Dropdown
            name={"paymentType"}
            label={"Payment Type"}
            options={paymentOptions}
            onChange={handlePaymentOptionChange} />

        </div>
        <div className="mt-5 mx-2 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-2 md:grid-cols-3">
          {mortgageStat.map((stat) => (
            <FinanceCard key={stat.name} item={stat} />
          ))}
        </div>
        <div className="mt-5 mx-2 grid grid-cols-1">
          <ResponsiveContainer width="100%" height={400}>
            <LineChart data={paymentSchedule}>
              <Line type="monotone" dataKey="paid" stroke="#2563eb" dot={false} strokeWidth={2} />
              <Line type="monotone" dataKey="principalPaid" stroke="#16a34a" dot={false} strokeWidth={2} />
              <Line type="monotone" dataKey="interestPaid" stroke="#dc2626" dot={false} strokeWidth={2} />
              <CartesianGrid stroke="#ccc" strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="date" />
              <YAxis />
              <Legend />
              <Tooltip />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </>
  )
}
