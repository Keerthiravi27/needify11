import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { Header } from '../components/Header';
import { BottomNav } from '../components/BottomNav';
import { Button } from '../components/ui/button';
import { RazorpayPaymentModal } from '../components/RazorpayPayment';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '../components/ui/alert-dialog';
import { ClipboardList, Package, Banknote, XCircle, MessageCircle } from 'lucide-react';
import { toast } from 'sonner';

const API_URL = process.env.REACT_APP_BACKEND_URL + '/api';

const Orders = () => {
  const { token, user } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await axios.get(`${API_URL}/orders`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setOrders(response.data);
    } catch (error) {
      console.error('Failed to fetch orders:', error);
      toast.error('Failed to load orders');
    } finally {
      setLoading(false);
    }
  };

  const handleCancelOrder = async (orderId) => {
    try {
      const response = await axios.post(
        `${API_URL}/orders/${orderId}/cancel`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      const fee = response.data.cancellation_fee;
      const chargedTo = response.data.charged_to;
      if (fee > 0) {
        toast.info(`Order cancelled. Cancellation fee: \u20b9${fee.toFixed(2)} (charged to ${chargedTo})`);
      } else {
        toast.success('Order cancelled successfully');
      }
      fetchOrders();
    } catch (error) {
      toast.error(error.response?.data?.detail || 'Failed to cancel order');
    }
  };

  const handlePayment = async (orderId) => {
    const order = orders.find(o => o.id === orderId);
    setSelectedOrder(order);
    setShowPaymentModal(true);
  };

  const handlePaymentSuccess = async () => {
    try {
      await axios.post(
        `${API_URL}/orders/${selectedOrder.id}/payment`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success('Payment completed successfully!');
      fetchOrders();
    } catch (error) {
      toast.error(error.response?.data?.detail || 'Payment failed');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          <p className="mt-4 text-muted-foreground">Loading orders...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-white">
      <Header />
      
      <div className="page-container max-w-7xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold font-outfit text-primary-foreground mb-2" data-testid="orders-heading">
            My Orders
          </h1>
          <p className="text-muted-foreground">Track and manage your orders</p>
        </div>

        {orders.length === 0 ? (
          <div className="text-center py-12">
            <ClipboardList className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground">No orders yet</p>
          </div>
        ) : (
          <div className="space-y-4">
            {orders.map((order) => (
              <div
                key={order.id}
                data-testid={`order-card-${order.id}`}
                className="bg-white rounded-2xl border border-green-100 p-6 shadow-sm hover:shadow-md transition-all duration-300"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <Package className="w-5 h-5 text-primary" />
                      <span className="font-semibold text-lg">Order #{order.id.slice(0, 8)}</span>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium capitalize ${
                        order.status === 'active' ? 'bg-blue-100 text-blue-700' :
                        order.status === 'completed' ? 'bg-green-100 text-green-700' :
                        'bg-red-100 text-red-700'
                      }`}>
                        {order.status}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground mb-1">
                      Type: <span className="font-medium capitalize">{order.order_type}</span>
                    </p>
                    <p className="text-sm text-muted-foreground mb-1">
                      Buyer: <span className="font-medium">{order.buyer_name}</span>
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Provider: <span className="font-medium">{order.provider_name}</span>
                    </p>
                  </div>
                  <div className="text-right ml-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Banknote className="w-5 h-5 text-primary" />
                      <span className="text-2xl font-bold font-outfit text-primary">₹{order.total_amount}</span>
                    </div>
                    <p className="text-xs text-muted-foreground">Commission: ₹{order.commission.toFixed(2)}</p>
                    {order.payment_status === 'pending' && (
                      <span className="inline-block mt-2 px-2 py-1 bg-red-100 text-red-700 rounded-full text-xs font-medium">
                        Payment Pending
                      </span>
                    )}
                    {order.payment_status === 'completed' && (
                      <span className="inline-block mt-2 px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">
                        Paid
                      </span>
                    )}
                  </div>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-green-100">
                  <p className="text-xs text-muted-foreground">
                    Created: {new Date(order.created_at).toLocaleString()}
                  </p>
                  <div className="flex gap-2">
                    {order.payment_status === 'completed' && (
                      <Link to={`/chat/${order.id}`}>
                        <Button
                          size="sm"
                          variant="outline"
                          className="rounded-full border-primary text-primary hover:bg-primary hover:text-white"
                          data-testid={`chat-btn-${order.id}`}
                        >
                          <MessageCircle className="w-4 h-4 mr-2" /> Chat
                        </Button>
                      </Link>
                    )}
                    {order.payment_status === 'pending' && order.buyer_id === user?.id && order.status === 'pending_payment' && (
                      <Button
                        onClick={() => handlePayment(order.id)}
                        data-testid={`pay-order-btn-${order.id}`}
                        className="btn-primary rounded-full text-sm"
                      >
                        Pay ₹{order.total_amount}
                      </Button>
                    )}
                    {(order.status === 'pending_payment' || order.status === 'active') && (
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button
                            variant="destructive"
                            size="sm"
                            data-testid={`cancel-order-btn-${order.id}`}
                            className="rounded-full"
                          >
                            <XCircle className="w-4 h-4 mr-2" /> Cancel
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Cancel Order?</AlertDialogTitle>
                            <AlertDialogDescription>
                              {order.buyer_id === user?.id
                                ? "Are you sure you want to cancel this order? If cancelled after 2 minutes, a 50% cancellation fee will apply to you as the poster."
                                : "Are you sure you want to cancel this order? No cancellation fee will be charged to you."}
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>No, keep it</AlertDialogCancel>
                            <AlertDialogAction
                              onClick={() => handleCancelOrder(order.id)}
                              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                            >
                              Yes, cancel
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <BottomNav />
      
      {/* Razorpay Payment Modal */}
      <RazorpayPaymentModal
        isOpen={showPaymentModal}
        onClose={() => setShowPaymentModal(false)}
        amount={selectedOrder?.total_amount || 0}
        onSuccess={handlePaymentSuccess}
        orderDetails={selectedOrder}
      />
    </div>
  );
};

export default Orders;
