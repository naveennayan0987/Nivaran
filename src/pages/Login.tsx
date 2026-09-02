import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, Lock } from 'lucide-react';

export default function Login() {
  const navigate = useNavigate();
  const [phone, setPhone]   = useState('');
  const [touched, setTouched] = useState(false);

  const clean   = phone.replace(/\D/g, '');
  const isValid = clean.length >= 10;

  const handleSend = () => {
    setTouched(true);
    if (isValid) {
      sessionStorage.setItem('nivaran_phone', phone || '98765 43210');
      navigate('/otp');
    }
  };

  return (
    <div className="app-shell">
      <div className="page-content-full flex flex-col">

        {/* Back */}
        <div className="px-6 pt-12 pb-4">
          <button
            onClick={() => navigate('/')}
            className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-border-light transition-colors"
          >
            <ChevronLeft size={22} className="text-text-primary" />
          </button>
        </div>

        {/* Title */}
        <div className="px-6 mb-8">
          <h1 className="text-[26px] font-bold text-text-primary leading-snug mb-2">
            Enter your mobile<br />number
          </h1>
          <p className="text-text-secondary text-sm leading-relaxed">
            We'll send you a{' '}
            <span className="text-accent font-medium">one-time verification code.</span>
          </p>
        </div>

        {/* Phone input */}
        <div className="px-6 mb-4">
          <div
            className="flex items-center bg-white rounded-2xl overflow-hidden h-[54px]"
            style={{
              border: touched && !isValid ? '1.5px solid #F59E0B' : '1.5px solid #E8E4DF',
              boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
            }}
          >
            {/* Country selector */}
            <div className="flex items-center gap-1.5 px-4 h-full border-r border-[#E8E4DF] flex-shrink-0">
              <span className="text-xs font-semibold text-text-secondary">IN</span>
              <span className="text-sm font-semibold text-text-primary">+91</span>
            </div>
            <input
              id="phone-input"
              type="tel"
              value={phone}
              onChange={e => setPhone(e.target.value)}
              onFocus={() => setTouched(false)}
              placeholder="98765 43210"
              className="flex-1 px-4 text-text-primary text-base font-medium bg-transparent outline-none placeholder:text-text-muted h-full"
              maxLength={14}
              autoComplete="tel"
            />
          </div>
        </div>

        {/* Privacy note */}
        <div className="px-6 mb-auto">
          <div className="bg-accent-light rounded-2xl p-3.5 flex items-start gap-3">
            <Lock size={14} className="text-accent mt-0.5 flex-shrink-0" />
            <p className="text-accent text-xs leading-relaxed">
              Your mobile number is used only for login. We never share or sell it.
            </p>
          </div>
        </div>

        {/* CTA */}
        <div className="px-6 pb-10 pt-6">
          <button
            id="send-otp-btn"
            onClick={handleSend}
            className="btn-primary"
          >
            Send OTP
          </button>
        </div>

      </div>
    </div>
  );
}
