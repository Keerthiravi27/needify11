import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { Header } from '../components/Header';
import { BottomNav } from '../components/BottomNav';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { ArrowLeft, User, Clock, CheckCircle2, Calendar } from 'lucide-react';
import { toast } from 'sonner';

const API_URL = process.env.REACT_APP_BACKEND_URL + '/api';

const GigDetail = () => {
  const { id } = useParams();
  const { user, token } = useAuth();
  const navigate = useNavigate();
  const [gig, setGig] = useState(null);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);
  const [proposedPrice, setProposedPrice] = useState('');
  const [showPriceInput, setShowPriceInput] = useState(false);

  useEffect(() => {
    fetchGig();
  }, [id]);

  const fetchGig = async () => {
    try {
      const response = await axios.get(`${API_URL}/gigs/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setGig(response.data);
    } catch (error) {
      toast.error('Failed to load gig');
      navigate('/gigs');
    } finally {
      setLoading(false);
    }
  };

  const handleAccept = async () => {
    if (!proposedPrice || parseFloat(proposedPrice) <= 0) {
      toast.error('Please enter a valid price');
      return;
    }

    setActionLoading(true);
    try {
      await axios.post(
        `${API_URL}/gigs/${id}/accept`,
        { gig_id: id, price: parseFloat(proposedPrice) },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success('Gig accepted! Waiting for payment from poster.');
      navigate('/orders');
    } catch (error) {
      toast.error(error.response?.data?.detail || 'Failed to accept gig');
    } finally {
      setActionLoading(false);
    }
  };

  const handleStatusUpdate = async (newStatus) => {
    setActionLoading(true);
    try {
      await axios.put(
        `${API_URL}/gigs/${id}/status`,
        { status: newStatus },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success(`Gig marked as ${newStatus}`);
      fetchGig();
    } catch (error) {
      toast.error(error.response?.data?.detail || 'Failed to update status');
    } finally {
      setActionLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          <p className="mt-4 text-muted-foreground">Loading gig...</p>
        </div>
      </div>
    );
  }

  if (!gig) return null;

  const isOwner = gig.poster_id === user?.id;
  const isAcceptor = gig.acceptor_id === user?.id;
  const canAccept = gig.status === 'open' && !isOwner;
  const canUpdateStatus = (isOwner || isAcceptor) && gig.status !== 'cancelled';

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-white">
      <Header />
      
      <div className="page-container max-w-4xl mx-auto px-4 py-8">
        <Link to="/gigs">
          <Button variant="ghost" data-testid="back-btn" className="mb-6 rounded-full">
            <ArrowLeft className="w-4 h-4 mr-2" /> Back to Gigs
          </Button>
        </Link>

        <div className="bg-white rounded-3xl shadow-xl border border-green-100 p-8">
          <div className="flex items-start justify-between mb-6">
            <div className="flex-1">
              <h1 className="text-3xl md:text-4xl font-bold font-outfit text-primary-foreground mb-3" data-testid="gig-title">
                {gig.title}
              </h1>
              <div className="flex items-center gap-3 flex-wrap">
                <span className="bg-green-100 text-primary px-4 py-1.5 rounded-full text-sm font-medium">
                  {gig.category}
                </span>
                <span className={`px-4 py-1.5 rounded-full text-sm font-medium capitalize ${
                  gig.status === 'open' ? 'bg-blue-100 text-blue-700' :
                  gig.status === 'accepted' ? 'bg-yellow-100 text-yellow-700' :
                  gig.status === 'completed' ? 'bg-green-100 text-green-700' :
                  'bg-red-100 text-red-700'
                }`}>
                  {gig.status}
                </span>
              </div>
            </div>
            {gig.price && (
              <div className="text-right ml-4">
                <div className="text-4xl font-bold font-outfit text-primary" data-testid="gig-price">₹{gig.price}</div>
                <p className="text-xs text-muted-foreground mt-1">Agreed price</p>
              </div>
            )}
          </div>

          <div className="mb-6">
            <h2 className="text-xl font-semibold font-outfit mb-3">Description</h2>
            <p className="text-muted-foreground leading-relaxed" data-testid="gig-description">{gig.description}</p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div className="flex items-center gap-3 p-4 bg-green-50 rounded-xl">
              <User className="w-8 h-8 text-primary" />
              <div>
                <p className="text-sm text-muted-foreground">Posted by</p>
                <p className="font-semibold" data-testid="poster-name">{gig.poster_name}</p>
              </div>
            </div>

            {gig.acceptor_name && (
              <div className="flex items-center gap-3 p-4 bg-green-50 rounded-xl">
                <CheckCircle2 className="w-8 h-8 text-primary" />
                <div>
                  <p className="text-sm text-muted-foreground">Accepted by</p>
                  <p className="font-semibold" data-testid="acceptor-name">{gig.acceptor_name}</p>
                </div>
              </div>
            )}

            {gig.deadline && (
              <div className="flex items-center gap-3 p-4 bg-green-50 rounded-xl">
                <Calendar className="w-8 h-8 text-primary" />
                <div>
                  <p className="text-sm text-muted-foreground">Deadline</p>
                  <p className="font-semibold">{new Date(gig.deadline).toLocaleString()}</p>
                </div>
              </div>
            )}

            <div className="flex items-center gap-3 p-4 bg-green-50 rounded-xl">
              <Clock className="w-8 h-8 text-primary" />
              <div>
                <p className="text-sm text-muted-foreground">Posted on</p>
                <p className="font-semibold">{new Date(gig.created_at).toLocaleDateString()}</p>
              </div>
            </div>
          </div>

          {canAccept && (
            <div className="space-y-4">
              {!showPriceInput ? (
                <Button
                  onClick={() => setShowPriceInput(true)}
                  data-testid="show-accept-btn"
                  className="w-full h-12 rounded-full btn-primary text-lg font-semibold"
                >
                  I'm Interested - Set My Price
                </Button>
              ) : (
                <div className="space-y-4 p-6 bg-green-50 rounded-2xl border-2 border-green-200">
                  <div>
                    <Label htmlFor="price" className="text-sm font-medium mb-2 block">
                      Your Proposed Price (₹) *
                    </Label>
                    <Input
                      id="price"
                      type="number"
                      step="1"
                      min="1"
                      data-testid="proposed-price-input"
                      placeholder="Enter amount in INR"
                      value={proposedPrice}
                      onChange={(e) => setProposedPrice(e.target.value)}
                      className="h-12 rounded-xl text-lg"
                    />
                    <p className="text-xs text-muted-foreground mt-2">
                      15% platform commission will be applied. You'll receive ₹{proposedPrice ? (parseFloat(proposedPrice) * 0.85).toFixed(2) : '0'}
                    </p>
                  </div>
                  <div className="flex gap-3">
                    <Button
                      onClick={handleAccept}
                      disabled={actionLoading}
                      data-testid="accept-gig-btn"
                      className="flex-1 h-12 rounded-full btn-primary text-lg font-semibold"
                    >
                      {actionLoading ? 'Accepting...' : 'Accept Gig'}
                    </Button>
                    <Button
                      onClick={() => setShowPriceInput(false)}
                      variant="outline"
                      className="h-12 rounded-full"
                    >
                      Cancel
                    </Button>
                  </div>
                </div>
              )}
            </div>
          )}

          {canUpdateStatus && (
            <div className="space-y-3">
              <p className="text-sm font-medium">Update Gig Status:</p>
              <div className="flex gap-3 flex-wrap">
                {gig.status === 'accepted' && (
                  <Button
                    onClick={() => handleStatusUpdate('completed')}
                    disabled={actionLoading}
                    data-testid="complete-gig-btn"
                    className="flex-1 rounded-full bg-green-600 hover:bg-green-700 text-white"
                  >
                    Mark as Completed
                  </Button>
                )}
                {(gig.status === 'open' || gig.status === 'accepted') && isOwner && (
                  <Button
                    onClick={() => handleStatusUpdate('cancelled')}
                    disabled={actionLoading}
                    data-testid="cancel-gig-btn"
                    variant="destructive"
                    className="flex-1 rounded-full"
                  >
                    Cancel Gig
                  </Button>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      <BottomNav />
    </div>
  );
};

export default GigDetail;
