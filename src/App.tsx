import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import Splash from './pages/Splash';
import Login from './pages/Login';
import OTP from './pages/OTP';
import Trust from './pages/Trust';
import Input from './pages/Input';
import Home from './pages/Home';
import Diagnosis from './pages/Diagnosis';
import Pathway from './pages/Pathway';
import Tracker from './pages/Tracker';
import Roadmap from './pages/Roadmap';
import Score from './pages/Score';
import Profile from './pages/Profile';

function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Splash />} />
          <Route path="/login" element={<Login />} />
          <Route path="/otp" element={<OTP />} />
          <Route path="/trust" element={<Trust />} />
          <Route path="/input" element={<Input />} />
          <Route path="/home" element={<Home />} />
          <Route path="/diagnosis" element={<Diagnosis />} />
          <Route path="/pathway" element={<Pathway />} />
          <Route path="/tracker" element={<Tracker />} />
          <Route path="/roadmap" element={<Roadmap />} />
          <Route path="/score" element={<Score />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </AppProvider>
  );
}

export default App;
