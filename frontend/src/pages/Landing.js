import { Link } from 'react-router-dom';
import { ArrowRight, Briefcase, ShoppingBag, Star, Users, Zap, Shield, TrendingUp } from 'lucide-react';
import { Button } from '../components/ui/button';

const Landing = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* App-style Header */}
      <div className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-green-100">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-xl">N</span>
              </div>
              <div>
                <h1 className="text-xl font-bold font-outfit text-primary-foreground">Needify</h1>
                <p className="text-xs text-muted-foreground">Campus Marketplace</p>
              </div>
            </div>
            <div className="flex gap-2">
              <Link to="/login">
                <Button variant="ghost" data-testid="landing-login-btn" className="rounded-full text-sm">
                  Login
                </Button>
              </Link>
              <Link to="/signup">
                <Button data-testid="landing-signup-btn" className="btn-primary rounded-full px-5 text-sm">
                  Sign Up
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Hero Section - App Style */}
      <div className="max-w-7xl mx-auto px-4 py-12 md:py-16">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-100 rounded-full mb-6">
            <Zap className="w-4 h-4 text-green-600" />
            <span className="text-sm font-semibold text-green-700">India's #1 Student Platform</span>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold font-outfit text-primary-foreground leading-tight mb-6">
            Find Campus Gigs &<br />
            <span className="text-primary">Earn While You Learn</span>
          </h1>
          
          <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
            Connect with 10,000+ students across India. Post gigs, offer services, and build your career from campus.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link to="/signup">
              <Button data-testid="hero-cta-btn" size="lg" className="btn-primary rounded-full px-8 h-14 text-lg shadow-lg shadow-green-200">
                Get Started Free <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <div className="flex -space-x-2">
                <div className="w-8 h-8 rounded-full bg-green-200 border-2 border-white flex items-center justify-center text-xs font-bold">A</div>
                <div className="w-8 h-8 rounded-full bg-green-300 border-2 border-white flex items-center justify-center text-xs font-bold">B</div>
                <div className="w-8 h-8 rounded-full bg-green-400 border-2 border-white flex items-center justify-center text-xs font-bold">C</div>
              </div>
              <span className="font-medium">2,500+ students joined this week</span>
            </div>
          </div>
        </div>

        {/* App Screenshot/Preview */}
        <div className="relative max-w-4xl mx-auto mb-20">
          <div className="absolute inset-0 bg-gradient-to-r from-green-200 to-green-100 rounded-3xl blur-3xl opacity-30"></div>
          <div className="relative bg-gradient-to-br from-green-50 to-white rounded-3xl p-8 border border-green-100 shadow-2xl">
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-white rounded-2xl p-6 border border-green-100 shadow-sm">
                <div className="w-12 h-12 rounded-xl bg-green-100 flex items-center justify-center mb-4">
                  <Briefcase className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-semibold text-lg mb-2">Post Gigs</h3>
                <p className="text-sm text-muted-foreground">Need help? Post your requirement and get instant proposals.</p>
              </div>
              <div className="bg-white rounded-2xl p-6 border border-green-100 shadow-sm">
                <div className="w-12 h-12 rounded-xl bg-green-100 flex items-center justify-center mb-4">
                  <ShoppingBag className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-semibold text-lg mb-2">Offer Services</h3>
                <p className="text-sm text-muted-foreground">Showcase your skills and earn money from fellow students.</p>
              </div>
              <div className="bg-white rounded-2xl p-6 border border-green-100 shadow-sm">
                <div className="w-12 h-12 rounded-xl bg-green-100 flex items-center justify-center mb-4">
                  <Star className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-semibold text-lg mb-2">Build Reputation</h3>
                <p className="text-sm text-muted-foreground">Get rated and build trust in the campus community.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section - App Style */}
      <div className="bg-gradient-to-br from-green-400 to-green-600 py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold font-outfit text-white mb-2">10K+</div>
              <div className="text-green-50">Active Students</div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold font-outfit text-white mb-2">5K+</div>
              <div className="text-green-50">Gigs Completed</div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold font-outfit text-white mb-2">50+</div>
              <div className="text-green-50">Colleges</div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold font-outfit text-white mb-2">4.8★</div>
              <div className="text-green-50">User Rating</div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Grid - App Style */}
      <div className="max-w-7xl mx-auto px-4 py-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold font-outfit mb-4">Why Students Love Needify</h2>
          <p className="text-muted-foreground">Everything you need to succeed on campus</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="group p-6 rounded-2xl border border-green-100 bg-white hover:shadow-xl hover:border-green-300 transition-all duration-300">
            <div className="w-14 h-14 rounded-2xl bg-green-100 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <Shield className="w-7 h-7 text-primary" />
            </div>
            <h3 className="text-xl font-semibold font-outfit mb-3">100% Secure Payments</h3>
            <p className="text-muted-foreground">All transactions protected with Razorpay gateway. Your money is safe with us.</p>
          </div>

          <div className="group p-6 rounded-2xl border border-green-100 bg-white hover:shadow-xl hover:border-green-300 transition-all duration-300">
            <div className="w-14 h-14 rounded-2xl bg-green-100 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <TrendingUp className="w-7 h-7 text-primary" />
            </div>
            <h3 className="text-xl font-semibold font-outfit mb-3">Earn ₹5K-20K/Month</h3>
            <p className="text-muted-foreground">Top students are earning pocket money by helping peers with assignments and projects.</p>
          </div>

          <div className="group p-6 rounded-2xl border border-green-100 bg-white hover:shadow-xl hover:border-green-300 transition-all duration-300">
            <div className="w-14 h-14 rounded-2xl bg-green-100 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <Users className="w-7 h-7 text-primary" />
            </div>
            <h3 className="text-xl font-semibold font-outfit mb-3">Verified Students Only</h3>
            <p className="text-muted-foreground">All users verified with college email. Connect with real students from your campus.</p>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="max-w-4xl mx-auto px-4 py-16">
        <div className="bg-gradient-to-br from-green-400 to-green-600 rounded-3xl p-8 md:p-12 text-center text-white shadow-2xl">
          <h2 className="text-3xl md:text-4xl font-bold font-outfit mb-4">
            Ready to Start Earning?
          </h2>
          <p className="text-lg text-green-50 mb-8 max-w-2xl mx-auto">
            Join thousands of students already making money and building skills through Needify.
          </p>
          <Link to="/signup">
            <Button data-testid="footer-cta-btn" size="lg" variant="secondary" className="rounded-full px-8 h-14 text-lg font-semibold">
              Create Free Account <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </Link>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-green-100 py-8 mt-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center">
                <span className="text-white font-bold">N</span>
              </div>
              <span className="font-semibold text-primary-foreground">Needify</span>
            </div>
            <p className="text-sm text-muted-foreground">&copy; 2024 Needify. All rights reserved.</p>
            <div className="flex gap-6 text-sm text-muted-foreground">
              <a href="#" className="hover:text-primary transition-colors">Privacy</a>
              <a href="#" className="hover:text-primary transition-colors">Terms</a>
              <a href="#" className="hover:text-primary transition-colors">Help</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
