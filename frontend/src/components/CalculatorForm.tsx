import { useState } from 'react';
import type { CalculateRequest, CalculateResponse } from '../types/calculate';

function CalculatorForm() {
    const [amount, setAmount] = useState<string>('');
    const [months, setMonths] = useState<string>('');
    const [rate, setRate] = useState<string>('');

    const [result, setResult] = useState<CalculateResponse | null>(null);
    const [error, setError] = useState<string>('');

    const handleSubmit = async (e: React.SyntheticEvent) => {
        e.preventDefault();

        setError('');
        setResult(null);

        const amountNum = Number(amount);
        const monthsNum = Number(months);
        const rateNum = Number(rate);

        if (isNaN(amountNum) || amountNum < 1000 || amountNum > 10000000) {
            setError('Сумма должна быть числом от 1000 до 10 000 000 ₽');
            return;
        }

        if (isNaN(monthsNum) || !Number.isInteger(monthsNum) || monthsNum < 1 || monthsNum > 60) {
            setError('Срок должен быть целым числом от 1 до 60 месяцев');
            return;
        }

        if (isNaN(rateNum) || rateNum < 1 || rateNum > 20) {
            setError('Ставка должна быть числом от 1% до 20%');
            return;
        }

        const request: CalculateRequest = {
            amount: amountNum,
            months: monthsNum,
            rate: rateNum,
        };

        try {
            const response = await fetch('http://localhost:8080/api/calculate', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(request),
            });

            if (!response.ok) {
                const errorData = await response.json();
                const firstError = Object.values(errorData)[0] as string;
                setError(firstError || 'Ошибка запроса');
                return;
            }

            const data: CalculateResponse = await response.json();
            setResult(data);

        } catch (err) {
            setError('Не удалось связаться с сервером');
        }
    };

    return (
        <form onSubmit={handleSubmit} className="form-container">
            <h1>Калькулятор вкладов</h1>

            <div className="form-group">
                <label>Сумма вклада (₽):</label>
                <input
                    type="number"
                    min={1000}
                    max={10000000}
                    required
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder="100000"
                    className="form-input"
                />
            </div>

            <div className="form-group">
                <label>Срок (месяцы):</label>
                <input
                    type="number"
                    min={1}
                    max={60}
                    required
                    value={months}
                    onChange={(e) => setMonths(e.target.value)}
                    placeholder="12"
                    className="form-input"
                />
            </div>

            <div className="form-group">
                <label>Годовая ставка (%):</label>
                <input
                    type="number"
                    min={1}
                    max={20}
                    step={0.1}
                    required
                    value={rate}
                    onChange={(e) => setRate(e.target.value)}
                    placeholder="8.5"
                    className="form-input"
                />
            </div>

            <button type="submit" className="form-button">Рассчитать</button>

            {error && <p className="form-error">{error}</p>}

            {result && (
                <div className="form-result">
                    <p>Начальная сумма: {amount} ₽</p>
                    <p>Итоговая сумма: {result.total} ₽</p>
                    <p>Доход: {result.profit} ₽</p>
                </div>
            )}
        </form>
    );
}

export default CalculatorForm;