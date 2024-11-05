import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Signup from './components/Signup';
import GenerateOTP from './components/GenerateOTP';
import VerifyOTP from './components/VerifyOTP';
import Login from './components/Login';
import ImageUpload from './components/ImageUpload';
import TextDisplay from './components/TextDisplay';

function App() {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/signup">Signup</Link>
            </li>
            <li>
              <Link to="/generate-otp">Generate OTP</Link>
            </li>
            <li>
              <Link to="/verify-otp">Verify OTP</Link>
            </li>
            <li>
              <Link to="/login">Login</Link>
            </li>
            <li>
              <Link to="/image-upload">Image Upload</Link>
            </li>
            <li>
              <Link to="/text-display">Text Display</Link>
            </li>
          </ul>
        </nav>

        <Routes>
          <Route path="/signup" element={<Signup />} />
          <Route path="/generate-otp" element={<GenerateOTP />} />
          <Route path="/verify-otp" element={<VerifyOTP />} />
          <Route path="/login" element={<Login />} />
          <Route path="/image-upload" element={<ImageUpload />} />
          <Route path="/text-display" element={<TextDisplay />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;