import { useState } from 'react';
import { X, Check, ChevronDown, Smartphone, CreditCard, Building2, Wallet, Calendar, Clock, Shield } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { toast } from 'sonner';

export const RazorpayPaymentModal = ({ isOpen, onClose, amount, onSuccess, orderDetails }) => {
  const [paymentMethod, setPaymentMethod] = useState('netbanking');
  const [selectedBank, setSelectedBank] = useState('sbi');
  const [phone, setPhone] = useState('');
  const [showBankDropdown, setShowBankDropdown] = useState(false);
  const [processing, setProcessing] = useState(false);

  const banks = [
    { id: 'sbi', name: 'State Bank of India', logo: '🏦' },
    { id: 'icici', name: 'ICICI Bank', logo: '🏦' },
    { id: 'axis', name: 'Axis Bank', logo: '🏦' },
    { id: 'kotak', name: 'Kotak Mahindra', logo: '🏦' },
    { id: 'yes', name: 'Yes Bank', logo: '🏦' },
    { id: 'idbi', name: 'IDBI Bank', logo: '🏦' },
  ];

  const handlePayment = async () => {
    if (!phone || phone.length < 10) {
      toast.error('Please enter a valid phone number');
      return;
    }

    setProcessing(true);
    
    // Simulate payment processing
    setTimeout(() => {
      setProcessing(false);
      toast.success('Payment Successful! 🎉 (Demo Mode)');
      onSuccess();
      onClose();
    }, 2000);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4" onClick={onClose}>
      <div 
        className="bg-white rounded-2xl shadow-2xl w-full max-w-md max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
        data-testid="razorpay-modal"
      >
        {/* Header */}
        <div className="sticky top-0 bg-[#528FF0] text-white p-6 rounded-t-2xl">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-2xl font-bold">Needify</h2>
              <div className="flex items-center gap-2 mt-1">
                <Shield className="w-4 h-4" />
                <span className="text-sm opacity-90">Powered by Razorpay</span>
              </div>
            </div>
            <button onClick={onClose} className="text-white hover:bg-white/20 rounded-full p-2 transition-colors" data-testid="close-payment-modal">
              <X className="w-6 h-6" />
            </button>
          </div>
          
          <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4">
            <p className="text-sm opacity-90 mb-1">Amount to Pay</p>
            <p className="text-3xl font-bold" data-testid="payment-amount">₹{amount}</p>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Contact */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Contact Number *
            </label>
            <div className="flex">
              <span className="inline-flex items-center px-4 bg-gray-100 border border-r-0 border-gray-300 rounded-l-lg text-gray-600">
                +91
              </span>
              <Input
                type="tel"
                placeholder="Enter phone number"
                maxLength="10"
                value={phone}
                onChange={(e) => setPhone(e.target.value.replace(/\D/g, ''))}
                className="rounded-l-none h-12"
                data-testid="phone-input"
              />
            </div>
          </div>

          {/* Payment Methods */}
          <div className="space-y-3 mb-6">
            <h3 className="font-semibold text-gray-900 mb-3">Choose Payment Method</h3>
            
            {/* Card */}
            <button
              onClick={() => setPaymentMethod('card')}
              className={`w-full flex items-center gap-3 p-4 rounded-xl border-2 transition-all ${
                paymentMethod === 'card'
                  ? 'border-[#528FF0] bg-blue-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
              data-testid="payment-method-card"
            >
              <CreditCard className="w-5 h-5 text-[#528FF0]" />
              <span className="font-medium">Credit / Debit Card</span>
              {paymentMethod === 'card' && <Check className="w-5 h-5 text-[#528FF0] ml-auto" />}
            </button>

            {/* UPI */}
            <button
              onClick={() => setPaymentMethod('upi')}
              className={`w-full flex items-center gap-3 p-4 rounded-xl border-2 transition-all ${
                paymentMethod === 'upi'
                  ? 'border-[#528FF0] bg-blue-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
              data-testid="payment-method-upi"
            >
              <Smartphone className="w-5 h-5 text-[#528FF0]" />
              <span className="font-medium">UPI / QR Code</span>
              {paymentMethod === 'upi' && <Check className="w-5 h-5 text-[#528FF0] ml-auto" />}
            </button>

            {/* Netbanking */}
            <button
              onClick={() => setPaymentMethod('netbanking')}
              className={`w-full flex items-center gap-3 p-4 rounded-xl border-2 transition-all ${
                paymentMethod === 'netbanking'
                  ? 'border-[#528FF0] bg-blue-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
              data-testid="payment-method-netbanking"
            >
              <Building2 className="w-5 h-5 text-[#528FF0]" />
              <span className="font-medium">Net Banking</span>
              {paymentMethod === 'netbanking' && <Check className="w-5 h-5 text-[#528FF0] ml-auto" />}
            </button>

            {/* Wallet */}
            <button
              onClick={() => setPaymentMethod('wallet')}
              className={`w-full flex items-center gap-3 p-4 rounded-xl border-2 transition-all ${
                paymentMethod === 'wallet'
                  ? 'border-[#528FF0] bg-blue-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
              data-testid="payment-method-wallet"
            >
              <Wallet className="w-5 h-5 text-[#528FF0]" />
              <span className="font-medium">Wallet</span>
              {paymentMethod === 'wallet' && <Check className="w-5 h-5 text-[#528FF0] ml-auto" />}
            </button>

            {/* EMI */}
            <button
              onClick={() => setPaymentMethod('emi')}
              className={`w-full flex items-center gap-3 p-4 rounded-xl border-2 transition-all ${
                paymentMethod === 'emi'
                  ? 'border-[#528FF0] bg-blue-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
              data-testid="payment-method-emi"
            >
              <Calendar className="w-5 h-5 text-[#528FF0]" />
              <span className="font-medium">EMI Options</span>
              {paymentMethod === 'emi' && <Check className="w-5 h-5 text-[#528FF0] ml-auto" />}
            </button>

            {/* Pay Later */}
            <button
              onClick={() => setPaymentMethod('paylater')}
              className={`w-full flex items-center gap-3 p-4 rounded-xl border-2 transition-all ${
                paymentMethod === 'paylater'
                  ? 'border-[#528FF0] bg-blue-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
              data-testid="payment-method-paylater"
            >
              <Clock className="w-5 h-5 text-[#528FF0]" />
              <span className="font-medium">Pay Later</span>
              {paymentMethod === 'paylater' && <Check className="w-5 h-5 text-[#528FF0] ml-auto" />}
            </button>
          </div>

          {/* Netbanking Options */}
          {paymentMethod === 'netbanking' && (
            <div className="mb-6 p-4 bg-gray-50 rounded-xl">
              <h4 className="font-semibold text-gray-900 mb-3">Select Your Bank</h4>
              <div className="grid grid-cols-3 gap-3 mb-3">
                {banks.map((bank) => (
                  <button
                    key={bank.id}
                    onClick={() => setSelectedBank(bank.id)}
                    className={`p-3 rounded-lg border-2 text-center transition-all ${
                      selectedBank === bank.id
                        ? 'border-[#528FF0] bg-blue-50'
                        : 'border-gray-200 bg-white hover:border-gray-300'
                    }`}
                    data-testid={`bank-${bank.id}`}
                  >
                    <div className="text-2xl mb-1">{bank.logo}</div>
                    <div className="text-xs font-medium truncate">{bank.name.split(' ')[0]}</div>
                  </button>
                ))}
              </div>
              <button
                onClick={() => setShowBankDropdown(!showBankDropdown)}
                className="w-full flex items-center justify-between p-3 bg-white border border-gray-300 rounded-lg hover:border-gray-400 transition-colors"
              >
                <span className="text-sm text-gray-600">Select a different bank</span>
                <ChevronDown className="w-4 h-4 text-gray-400" />
              </button>
            </div>
          )}

          {/* Pay Button */}
          <Button
            onClick={handlePayment}
            disabled={processing}
            className="w-full h-14 text-lg font-semibold bg-[#528FF0] hover:bg-[#3d7dd6] text-white rounded-xl"
            data-testid="pay-now-button"
          >
            {processing ? (
              <div className="flex items-center gap-2">
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                Processing...
              </div>
            ) : (
              `Pay ₹${amount}`
            )}
          </Button>

          <p className="text-xs text-center text-gray-500 mt-4">
            🔒 Secure payment powered by Razorpay (Demo Mode)
          </p>
        </div>
      </div>
    </div>
  );
};
