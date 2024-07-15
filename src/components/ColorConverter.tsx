import React, { useState, useRef } from 'react';
import styles from './ColorConverter.module.css';

export const ColorConverter: React.FC = () => {
    const [hex, setHex] = useState<string>('');
    const [rgb, setRgb] = useState<string>('rgb(255, 255, 255)');
    const [error, setError] = useState<boolean>(false);
    const hexInputRef = useRef<HTMLInputElement>(null);

    const hexToRgb = (hex: string): string | null => {
        const cleanHex = hex.replace('#', '');

        if (cleanHex.length !== 6 || !/^[0-9A-Fa-f]{6}$/.test(cleanHex)) {
            return null;
        }

        // HEX в RGB
        const bigint = parseInt(cleanHex, 16);
        const r = (bigint >> 16) & 255;
        const g = (bigint >> 8) & 255;
        const b = bigint & 255;

        return `rgb(${r}, ${g}, ${b})`;
    };

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        setHex(value);

        if (value.length === 7) {
            const rgbValue = hexToRgb(value);
            if (rgbValue) {
                setRgb(rgbValue);
                setError(false);
            } else {
                setError(true);
            }
        } else {
            setError(false);
        }
    };

    return (
        <div className={styles.container} style={{ backgroundColor: error ? '#fff' : rgb }}>
            <div className={styles.text}>Введите код цвета:</div>
            <div className={styles.form}>
                <input
                    ref={hexInputRef}
                    type="text"
                    value={hex}
                    onChange={handleChange}
                    placeholder="#000000"
                    maxLength={7}
                    className={styles.input}
                />
                <div className={`${styles.displayInfo} ${error ? styles.error : ''}`}>
                    {error ? 'Ошибка!' : rgb}
                </div>
            </div>
        </div>
    );
};
