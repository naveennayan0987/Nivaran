import { useState, useRef, KeyboardEvent, ClipboardEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function OTP() {
  const navigate      = useNavigate();
  const { setIsLoggedIn } = useApp();
  const phone         = sessionStorage.getItem('nivaran_phone') || '98765 43210';

  const [digits, setDigits] = useState(Array(6).fill(''));
  const refs = useRef<(HTMLInputElement | null)[]>([]);

  const handleChange = (i: number, val: string) => {
    if (!/^\d*$/.test(val)) return;
    const d = [...digits];
    d[i] = val.slice(-1);
    setDigits(d);
    if (val && i < 5) refs.current[i + 1]?.focus();
  };

  const handleKeyDown = (i: number, e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !digits[i] && i > 0) {
      refs.current[i - 1]?.focus();
    }
  };

  const handlePaste = (e: ClipboardEvent) => {
    const pasted = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 6);
    if (pasted.length === 6) {
      setDigits(pasted.split(''));
      refs.current[5]?.focus();
    }
    e.preventDefault();
  };

  const isFull = digits.every(d => d !== '');

  const handleVerify = () => {
    if (isFull) {
      setIsLoggedIn(true);
      navigate('/trust');
    }
  };

  return (
    <div className="app-shell">
      <div className="page-content-full flex flex-col">

        {/* Back */}
        <div className="px-6 pt-12 pb-4">
          <button
            onClick={() => navigate('/login')}
            className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-border-light transition-colors"
          >
            <ChevronLeft size={22} className="text-text-primary" />
          </button>
        </div>

        {/* Title */}
        <div className="px-6 mb-8">
          <h1 className="text-[26px] font-bold text-text-primary leading-snug mb-2">
            Enter the code
          </h1>
          <p className="text-text-secondary text-sm leading-relaxed">
            We sent a 6-digit code to{' '}
            <span className="text-accent font-semibold">+91 {phone}</span>
          </p>
        </div>

        {/* OTP boxes */}
        <div className="px-6 mb-auto">
          <div className="flex gap-2.5" onPaste={handlePaste}>
            {digits.map((d, i) => (
              <input
                key={i}
                ref={el => { refs.current[i] = el; }}
                id={`otp-input-${i}`}
                type="tel"
                inputMode="numeric"
                maxLength={1}
                value={d}
                onChange={e => handleChange(i, e.target.value)}
                onKeyDown={e => handleKeyDown(i, e)}
                className={`otp-input ${d ? 'filled' : ''}`}
              />
            ))}
          </div>
        </div>

        {/* Verify CTA */}
        <div className="px-6 pb-10 pt-6">
          <button
            id="verify-otp-btn"
            onClick={handleVerify}
            disabled={!isFull}
            className={`btn-primary mb-4 ${!isFull ? 'opacity-40 cursor-not-allowed' : ''}`}
          >
            Verify &amp; Continue
          </button>
          <p className="text-center text-text-secondary text-sm">
            Didn't receive it?{' '}
            <button className="text-accent font-semibold underline underline-offset-2">
              Resend OTP
            </button>
          </p>
        </div>

      </div>
    </div>
  );
}
