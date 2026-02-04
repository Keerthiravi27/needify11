import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Checkbox } from '../components/ui/checkbox';
import { Mail, Lock, User, School, Phone, ArrowRight, Sparkles } from 'lucide-react';
import { toast } from 'sonner';

const AuthScreen = () => {
  const [mode, setMode] = useState('welcome'); // welcome, signin, signup
  const { login, signup } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  // Sign in state
  const [signInData, setSignInData] = useState({ email: '', password: '' });
  
  // Sign up state
  const [signUpData, setSignUpData] = useState({
    name: '',
    email: '',
    password: '',
    college: '',
    phone: '',
    terms_accepted: false,
  });

  const handleSignIn = async (e) => {
    e.preventDefault();
    if (!signInData.email || !signInData.password) {
      toast.error('Please fill in all fields');
      return;
    }

    setLoading(true);
    try {
      await login(signInData.email, signInData.password);
      toast.success('Welcome back!');
      navigate('/home');
    } catch (error) {
      toast.error(error.response?.data?.detail || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    if (!signUpData.name || !signUpData.email || !signUpData.password || !signUpData.college) {
      toast.error('Please fill in all required fields');
      return;
    }
    if (!signUpData.terms_accepted) {
      toast.error('Please accept the terms and conditions');
      return;
    }

    setLoading(true);
    try {
      await signup(signUpData);
      toast.success('Account created successfully!');
      navigate('/home');
    } catch (error) {
      toast.error(error.response?.data?.detail || 'Signup failed');
    } finally {
      setLoading(false);
    }
  };

  // Welcome Screen
  if (mode === 'welcome') {
    return (
      <div className="fixed inset-0 bg-gradient-to-br from-green-50 to-white flex flex-col">
        {/* Content - centered vertically */}
        <div className="flex-1 flex flex-col items-center justify-center px-6">
          {/* Logo */}
          <div className="mb-8">
            <div className="w-24 h-24 rounded-3xl bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center shadow-2xl">
              <span className="text-5xl font-bold text-white">N</span>
            </div>
          </div>

          {/* Title */}
          <h1 className="text-4xl font-bold font-outfit text-primary-foreground mb-3 text-center">
            Welcome to Needify
          </h1>
          <p className="text-lg text-muted-foreground text-center mb-12 max-w-sm">
            Find campus gigs, offer services, and earn while you learn
          </p>

          {/* Stats */}
          <div className="flex gap-8 mb-12">
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">10K+</div>
              <div className="text-xs text-muted-foreground">Students</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">5K+</div>
              <div className="text-xs text-muted-foreground">Gigs</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">50+</div>
              <div className="text-xs text-muted-foreground">Colleges</div>
            </div>
          </div>
        </div>

        {/* Fixed bottom buttons */}
        <div className="p-6 space-y-3">
          <Button
            onClick={() => setMode('signup')}
            className="w-full h-14 text-lg font-semibold btn-primary rounded-full shadow-lg"
            data-testid="auth-create-account-btn"
          >
            Create Account <ArrowRight className="ml-2 w-5 h-5" />
          </Button>
          <Button
            onClick={() => setMode('signin')}
            variant="outline"
            className="w-full h-14 text-lg font-semibold rounded-full border-2"
            data-testid="auth-signin-btn"
          >
            Sign In
          </Button>
        </div>
      </div>
    );
  }

  // Sign In Screen
  if (mode === 'signin') {
    return (
      <div className="fixed inset-0 bg-gradient-to-br from-green-50 to-white flex flex-col">
        {/* Header */}
        <div className="p-6">
          <button
            onClick={() => setMode('welcome')}
            className="text-muted-foreground hover:text-primary"
          >
            ← Back
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 flex flex-col justify-center px-6">
          <div className="mb-8">
            <h1 className="text-3xl font-bold font-outfit text-primary-foreground mb-2">
              Welcome Back
            </h1>
            <p className="text-muted-foreground">Sign in to continue</p>
          </div>

          <form onSubmit={handleSignIn} className="space-y-5">
            <div>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  type="email"
                  placeholder="Email"
                  value={signInData.email}
                  onChange={(e) => setSignInData({ ...signInData, email: e.target.value })}
                  className="pl-12 h-14 rounded-2xl text-base"
                  data-testid="signin-email-input"
                />
              </div>
            </div>

            <div>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  type="password"
                  placeholder="Password"
                  value={signInData.password}
                  onChange={(e) => setSignInData({ ...signInData, password: e.target.value })}
                  className="pl-12 h-14 rounded-2xl text-base"
                  data-testid="signin-password-input"
                />
              </div>
            </div>

            <Button
              type="submit"
              disabled={loading}
              className="w-full h-14 text-lg font-semibold btn-primary rounded-full mt-8"
              data-testid="signin-submit-btn"
            >
              {loading ? 'Signing In...' : 'Sign In'}
            </Button>
          </form>
        </div>

        {/* Bottom link */}
        <div className="p-6 text-center">
          <p className="text-muted-foreground">
            Don't have an account?{' '}
            <button onClick={() => setMode('signup')} className="text-primary font-semibold">
              Create one
            </button>
          </p>
        </div>
      </div>
    );
  }

  // Sign Up Screen
  return (
    <div className="fixed inset-0 bg-gradient-to-br from-green-50 to-white overflow-y-auto">
      {/* Header */}
      <div className="sticky top-0 bg-gradient-to-br from-green-50 to-white p-6 z-10">
        <button
          onClick={() => setMode('welcome')}
          className="text-muted-foreground hover:text-primary"
        >
          ← Back
        </button>
      </div>

      {/* Content */}
      <div className="px-6 pb-6">
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-2">
            <Sparkles className="w-6 h-6 text-primary" />
            <h1 className="text-3xl font-bold font-outfit text-primary-foreground">
              Create Account
            </h1>
          </div>
          <p className="text-muted-foreground">Join thousands of students</p>
        </div>

        <form onSubmit={handleSignUp} className="space-y-4">
          <div className="relative">
            <User className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              placeholder="Full Name"
              value={signUpData.name}
              onChange={(e) => setSignUpData({ ...signUpData, name: e.target.value })}
              className="pl-12 h-14 rounded-2xl text-base"
              data-testid="signup-name-input"
            />
          </div>

          <div className="relative">
            <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              type="email"
              placeholder="College Email"
              value={signUpData.email}
              onChange={(e) => setSignUpData({ ...signUpData, email: e.target.value })}
              className="pl-12 h-14 rounded-2xl text-base"
              data-testid="signup-email-input"
            />
          </div>

          <div className="relative">
            <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              type="password"
              placeholder="Password"
              value={signUpData.password}
              onChange={(e) => setSignUpData({ ...signUpData, password: e.target.value })}
              className="pl-12 h-14 rounded-2xl text-base"
              data-testid="signup-password-input"
            />
          </div>

          <div className="relative">
            <School className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              placeholder="College Name"
              value={signUpData.college}
              onChange={(e) => setSignUpData({ ...signUpData, college: e.target.value })}
              className="pl-12 h-14 rounded-2xl text-base"
              data-testid="signup-college-input"
            />
          </div>

          <div className="relative">
            <Phone className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              placeholder="Phone (Optional)"
              value={signUpData.phone}
              onChange={(e) => setSignUpData({ ...signUpData, phone: e.target.value })}
              className="pl-12 h-14 rounded-2xl text-base"
              data-testid="signup-phone-input"
            />
          </div>

          <div className="flex items-start gap-3 pt-2">
            <Checkbox
              id="terms"
              checked={signUpData.terms_accepted}
              onCheckedChange={(checked) => setSignUpData({ ...signUpData, terms_accepted: checked })}
              data-testid="signup-terms-checkbox"
            />
            <label htmlFor="terms" className="text-sm text-muted-foreground leading-relaxed">
              I accept the Terms & Conditions
            </label>
          </div>

          <Button
            type="submit"
            disabled={loading}
            className="w-full h-14 text-lg font-semibold btn-primary rounded-full mt-6"
            data-testid="signup-submit-btn"
          >
            {loading ? 'Creating Account...' : 'Create Account'}
          </Button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-muted-foreground">
            Already have an account?{' '}
            <button onClick={() => setMode('signin')} className="text-primary font-semibold">
              Sign in
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default AuthScreen;
