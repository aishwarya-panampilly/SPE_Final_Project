import { Link } from 'react-router-dom';
import '../presentation/LandingPage.css';

function LandingPage() {
  return (
    <div className="landing-container">
      <h1 className="landing-title">Planner App</h1>
      <div className="landing-card">
        <Link to="/login" className="btn btn-primary mb-3 w-100">Login</Link>
        <Link to="/signup" className="btn btn-secondary w-100">Sign Up</Link>
      </div>
    </div>
  );
}

export default LandingPage;
